import React, { useState } from 'react'
import { useCartContext } from '../CartContext';
import Loading from '../component/Loading';
import { productReducer } from '../reducers';

function CartItem({item}) { 
    const [qty, setQty] = useState(item.qty);
    const {removeFromCart, loading, error, addToCart} = useCartContext();

   
    console.log(qty)
    
    const onChangeHandler = (e) => {
        setQty(Number(e.target.value));
        addToCart(item.productId, Number(e.target.value));
    }

    return (
       <>
        <tr>
            <td style={{ width: '30%' }}>
                <img
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg"
                    alt="" className='img-fluid' style={{ maxWidth: '50%', width: '50%' }} />
            </td>
            <td>{item.name}</td>
            <td>${item.price}</td>
            <td>
                {/* <select value={qty} className="quantity" onChange={onChangeHandler}>
                                        {
                                            [...Array(product.stock).keys()].map(x => (
                                                <option value={x + 1} key={x + 1}>{x + 1} </option>
                                            ))
                                        }
                                    </select> */}
                <select name="" id="" value={qty} onChange={onChangeHandler}>
                    { 
                        [...Array(item.stock).keys()].map((x, index) => {
                            return <option value={x + 1} key={x + 1}>
                                {x + 1}
                            </option>
                        })
                    }
                </select>
            </td>
            <td>
                ${item.price * qty}
            </td>
            <td> <button className="btn btn-danger" onClick={() => removeFromCart(item.productId)}>Remove</button> </td>
        </tr>
        {/* <tr>
            <td>Total amount: </td>
        </tr> */}
       </>
    )
}

export default CartItem
