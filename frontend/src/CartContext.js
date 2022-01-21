import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import Cookies from "universal-cookie";
import { cartReducer } from "./reducers";

const CartContext = createContext();

const initialState = {
    message: '',
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const cookie = new Cookies();

    const addToCart = async (id, qty) => {
        setLoading(true)
        try {
            const {data} = await axios.get(`http://localhost:5000/api/product/${id}`)
            const item = {
                name: data.product.name,
                productId: data.product._id,
                avatar: data.product.avatar,
                price: data.product.price,
                stock: data.product.stock,
                qty
            }
            console.log('add')
            dispatch({ type: 'CART_ADD_ITEM', payload:item});
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    };

    const removeFromCart = async(id) => {
        setLoading(false);
        try {
            dispatch({ type: 'CART_REMOVE_ITEM', payload: id });
        } catch (error) {
            setError(error);
        };
    };

    const saveShippingAddress = async (data) => {
        try {
            dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
        } catch (error) {
            setError(error.message)
        }
    };

    const savePaymentMethod = async (method) => {
        try {
            dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: method })
        } catch (error) {
            setError(error.message)
        }
    };

    const createOrder = async (order) => {
        setLoading(true)
        try {
            const {data} = await axios.post('http://localhost:5000/api/order/create', order, {
                headers: {
                    Authorization: `Bearer ${cookie.get('access_token')}`
                }
            });

            console.log('dataa',data)
            
            if(data.error) {
                setError(data.error);
                setLoading(false)
                return;
            }
            dispatch({ type: 'ORDER_CREATE', payload: data.message });
            dispatch({ type: 'CART_RESET_ALL' })
            setMessage(data.message);
            setLoading(false)

        } catch (error) {
            
        }
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },[state.cart]);

    useEffect(() => {
        localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    },[state.shippingAddress]);

    useEffect(() => {
        localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod));
    },[state.paymentMethod]);

    
    return <CartContext.Provider value={{
        addToCart,
        removeFromCart,
        ...state,
        error,
        loading,
        saveShippingAddress,
        savePaymentMethod,
        createOrder,
        message
    }}>
        {children}
    </CartContext.Provider>
}

export const useCartContext = () => {
    return useContext(CartContext);
}