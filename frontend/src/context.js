import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from 'axios'
import Cookies from "universal-cookie";
import { productReducer } from "./reducers";

const AppContext = createContext();

const initialState = {
    user: {},
    loading: true,
    error: false
}

export const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const cookie = new Cookies();
    const [success, setSuccess] = useState(false);
    const [product, setProduct] = useState(null);
    
    const fetchData = async () => {
        setLoading(true);

        try {
            const {data} = await axios.get('http://localhost:5000/api/product');
            if(data.error) {
                setError(data.error)
                setLoading(false);
                return;
            } else {
                setProducts(data.products);
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            // setError(error.message);
            console.log(error)
            setError(true);
            setLoading(false);
        }
    }

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const {data} = await axios.get('http://localhost:5000/api/category')
            if(data.error) {
                setError(true)
                setMessage(data.error)
            } else {
                setCategories(data.categories);
            }
            setLoading(false);
        } catch (error) {
            setMessage(error.message)
            setError(true);
            setLoading(false);
        }
    }

    const addProduct = async (formData) => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        try {
            const {data} = await axios.post('http://localhost:5000/api/product/create', formData, {
                headers: {
                        Authorization: `Bearer ${cookie.get('access_token')}`
                }
            });

            if(data.error) {
                setMessage(data.error)
                setError(true)
                setLoading(false)
                return;
            }
            setSuccess(true)
            setError(false);
            setMessage(data.message);
            setLoading(false)
            window.location.replace("/")
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }


    const getProduct = async (id) => {
        setLoading(true);
        try {
            const {data} = await axios.get(`http://localhost:5000/api/product/${id}`);
            
            if(data.error) {
                setMessage(data.error)
                setError(true);
                setLoading(false)
            }
            setProduct({
                _id: data.product._id,
                name: data.product.name,
                category: data.product.category.name,
                stock: data.product.stock,
                sale: data.product.sale,
                price: data.product.price,
                avatar: data.product.avatar,
                description: data.product.description
            })
            setError(false)
            setLoading(false)

        } catch (error) {
            setLoading(false);
            setError(true);
            setMessage(error.message);
        }
    }

    // useEffect(() => {
    //     fetchData();
    // }, [])

    // useEffect(() => {
    //     fetchCategories();
    // }, [])
    
    
    return <AppContext.Provider value={{ 
        loading, 
        products, 
        error, 
        categories, 
        success,
        message,
        product,
        addProduct,
        fetchCategories,
        fetchData,
        getProduct,
        }}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}