import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { userReducer } from "./reducers";
import Cookies from 'universal-cookie';

const AuthContext = createContext();

const initialState = {
    user: {},
}

export const AuthProvider = ({ children }) => {
    const cookies = new Cookies();
    const [authed, setAuthed] = useState(() => {
        return cookies.get('access_token') ? true : false
    });
    const [state, dispatch] = useReducer(userReducer, initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false)
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false); 
    // const [state, dispatch] = useReducer(userReducer, initialState)

    
 
    
    const getUserInfo = async () => {
        // setLoading(true);
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

            if(data.user.role === 'admin') {
                setIsAdmin(true);
            }

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
            dispatch({ type: 'CART_RESET_ALL' });
            cookies.remove('access_token');
            setLoading(false)
            setAuthed(false)
            setIsAdmin(false);
            // document.location.reload('/')
        } catch (error) {
            setError(error.message);
            setAuthed(false)
        }
    }

    useEffect(() => {
        console.log(state, 'state')
        if(authed && state.user && state.user.role === 'admin') {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }

    }, [isAdmin, state, authed])

    useEffect(() => {
        if (!cookies.get('access_token')) {
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
        if (authed && state.user && state.user.role === 'admin') {
            setIsAdmin(true);
        }
        console.log(state)
    }, [state.user])

    useEffect(() => {
        const datum = Date.now() / 1000;
        if (state.user && state.user.exp && state.user.exp < datum) {
            logout();
        }
    }, [state.user])

    return <AuthContext.Provider value={{
        login,
        loading,
        error,
        authed,
        isAdmin,
        logout,
        success,
        message,
    }}>
        {children}
    </AuthContext.Provider>
}


export const AuthConsumer = () => {
    return useContext(AuthContext)
}