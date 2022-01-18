import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "./reducers";

const CartContext = createContext();

const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
    }

    const removeFromCart = async(id) => {
        setLoading(false);
        try {
            dispatch({ type: 'CART_REMOVE_ITEM', payload: id });
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },[state.cart])
    
    return <CartContext.Provider value={{
        addToCart,
        removeFromCart,
        ...state,
        error,
        loading
    }}>
        {children}
    </CartContext.Provider>
}

export const useCartContext = () => {
    return useContext(CartContext);
}