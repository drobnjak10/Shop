import React, { useState } from 'react'
import { useCartContext } from '../CartContext';
import Loading from '../component/Loading';

function CartItem({item}) { 
    const [qty, setQty] = useState(1);
    const {removeFromCart, loading, error} = useCartContext();

   
    console.log(item)
    
    const onChangeHandler = () => {
        console.log('')
    }

    if(loading) {
        return <Loading />
    }
    
    
    return (
        <tr>
            <td style={{ width: '30%' }}>
                <img
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg"
                    alt="" className='img-fluid' style={{ maxWidth: '50%', width: '50%' }} />
            </td>
            <td>{item.name}</td>
            <td>$800</td>
            <td>
                {/* <select value={qty} className="quantity" onChange={onChangeHandler}>
                                        {
                                            [...Array(product.stock).keys()].map(x => (
                                                <option value={x + 1} key={x + 1}>{x + 1} </option>
                                            ))
                                        }
                                    </select> */}
                <select name="" id="">
                    { 
                        [...Array(item.stock).keys()].map((x, index) => {
                            return <option value={x + 1} key={x + 1}>
                                {x + 1}
                            </option>
                        })
                    }
                </select>
            </td>
            <td>$800</td>
            <td> <button className="btn btn-danger" onClick={() => removeFromCart(item.productId)}>Remove</button> </td>
        </tr>
    )
}

export default CartItem
