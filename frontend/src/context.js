import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from 'axios'
import Cookies from "universal-cookie";
import { cartReducer, productReducer } from "./reducers";

const AppContext = createContext();

const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
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
    

    // const [state, dispatch] = useReducer(cartReducer, initialState);

    // const addToCart = async (id, qty) => {
    //     setLoading(true);
    //     try {
    //         const {data} = await axios.get(`http://localhost:5000/api/product/${id}`)
    //         const item = {
    //             name: data.product.name,
    //             productId: data.product._id,
    //             avatar: data.product.avatar,
    //             price: data.product.price,
    //             stock: data.product.stock,
    //             qty
    //         }
    //         dispatch({ type: 'CART_ADD_ITEM', payload:item});
    //         setLoading(false)
    //     } catch (error) {
    //         setError(true)
    //         setLoading(false)
    //     }
    // }
    
    // const fetchData = async () => {
    //     setLoading(true);

    //     try {
    //         const {data} = await axios.get('http://localhost:5000/api/product');
    //         if(data.error) {
    //             setError(data.error)
    //             setLoading(false);
    //             return;
    //         } else {
    //             setProducts(data.products);
    //             setLoading(false);
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         // setError(error.message);
    //         console.log(error)
    //         setError(true);
    //         setLoading(false);
    //     }
    // }

    // const fetchCategories = async () => {
    //     setLoading(true)
    //     try {
    //         const {data} = await axios.get('http://localhost:5000/api/category')
    //         if(data.error) {
    //             setError(true)
    //             setMessage(data.error)
    //         } else {
    //             setCategories(data.categories);
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         setMessage(error.message)
    //         setError(true);
    //         setLoading(false);
    //     }
    // }

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

    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(state.cart));
    // }, [state.cart])
    
    
    return <AppContext.Provider value={{ 
        loading, 
        products, 
        error, 
        categories, 
        success,
        message,
        product,
        addProduct,
        // fetchCategories,
        // fetchData,
        getProduct,
        // ...state,
        // addToCart
        }}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}