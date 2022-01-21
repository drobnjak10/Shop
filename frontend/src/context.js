import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from 'axios'
import Cookies from "universal-cookie";
import { cartReducer, productReducer, userReducer } from "./reducers";

const AppContext = createContext();

const initialState = {
    products: []
}

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const cookie = new Cookies();
    const [success, setSuccess] = useState(false);
    const [product, setProduct] = useState(null);
    const [state, dispatch] = useReducer(productReducer, initialState);


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

    const getProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/product');
            dispatch({ type: 'GET_PRODUCTS', payload: data.products });
        } catch (error) {
            setError(error.message);
        }
    }

    const addProduct = async (formData) => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        try {
            const { data } = await axios.post('http://localhost:5000/api/product/create', formData, {
                headers: {
                    Authorization: `Bearer ${cookie.get('access_token')}`
                }
            });


            console.log(data)

            if (data.error) {
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
        try {
            const { data } = await axios.get(`http://localhost:5000/api/product/${id}`);

            if (data.error) {
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

    const removeProduct = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookie.get('access_token')}`
                }
            });
            console.log(data)
            if(data.error) {
                setError(data.error);
                return;
            }
            // dispatch({ type: 'PRODUCT_REMOVE', payload: data.message});
        } catch (error) {

        }
    }

    const editProduct = async (formData) => {
        try {
            console.log(formData)
            const { data } = await axios.patch(`http://localhost:5000/api/product/edit`, formData, {
                headers: {
                    Authorization: `Bearer ${cookie.get('access_token')}`
                }
            });
            if(data.error) {
                setError(data.message);
                return;
            }
            setMessage(data.message);
        } catch (error) {
            
        }
    }

    const getCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/category');
            setCategories(data.categories)
            setLoading(false)
        } catch (error) {
            setError(error.message);
            setLoading(false)
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
        error,
        categories,
        success,
        message,
        product,
        addProduct,
        // fetchCategories,
        // fetchData,
        getProduct,
        getProducts,
        removeProduct,
        editProduct,
        getCategories,
        ...state
        // ...state,
        // addToCart
    }}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}