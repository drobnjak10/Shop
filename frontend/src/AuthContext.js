import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { userReducer } from "./reducers";
import Cookies from 'universal-cookie';

const AuthContext = createContext();

const initialState = {
    user: {},
}

export const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(false);
    const [state, dispatch] = useReducer(userReducer, initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false)
    const [success, setSuccess] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState({});
    const cookies = new Cookies();

    const getUserInfo = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:5000/api/user/me', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('access_token')}`
                },
                withCredentials: false
            });
            dispatch({
                type: "USER_INFO", payload: {
                    username: data.user.username,
                    email: data.user.email,
                    role: data.user.role,
                    exp: data.user.exp
                }
            });
            setUser(data.user);
            setAuthed(true);
            setLoading(false);
        } catch (error) {
            setError(error);
            setAuthed(false)
        }
    }

    const login = async (email, password) => {
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password });
            if (data.error) {
                setLoading(false)
                setError(true)
                setMessage(data.error)
                return;
            }
            dispatch({ type: 'USER_LOGIN', payload: data.user })
            cookies.set('access_token', data.token);
            setUser(data.user);
            setSuccess(true);
            setMessage(data.message)
            setAuthed(true)
        } catch (error) {
            setError(true);
            setLoading(false)
        }
    }

    const logout = async () => {
        setError(false);
        setLoading(true)
        try {
            const { data } = await axios.get('http://localhost:5000/api/user/logout', {
                headers: {
                    Authorization: `Bearer ${cookies.get('access_token')}`
                },
                withCredentials: false
            });
            cookies.remove('access_token');
            console.log(data)

            if (data.error) {
                setError(error.message);
                setLoading(false)
                setAuthed(false)
                return;
            }
            dispatch({ type: "USER_LOGOUT" });
            setLoading(false)
            cookies.remove('access_token');
            setAuthed(false)
            setAdmin(false);
            setUser({})
        } catch (error) {
            setError(error.message);
            setAuthed(false)
        }
    }

    useEffect(() => {
        if(!cookies.get('access_token')) {
            setAuthed(false);
        }

        if (cookies.get('access_token')) {
            setAuthed(true);
        }

        if (authed && cookies.get('access_token')) {
            getUserInfo();
        }
        if (cookies.get('access_token') === 'undefined') {
            setAuthed(false)
            return;
        }
    }, [])

    useEffect(() => {
        if(user && user.role === 'admin') {
            setAdmin(true);
        }
    },[user])

    useEffect(() => {
        const datum = Date.now() / 1000;
        if(state.user && state.user.exp && state.user.exp < datum ) {
            logout();
        }
        console.log(state)
    }, [state])

    return <AuthContext.Provider value={{
        login,
        loading,
        error,
        authed,
        admin,
        logout,
        success,
        message
    }}>
        {children}
    </AuthContext.Provider>
}


export const AuthConsumer = () => {
    return useContext(AuthContext)
}