import React from 'react'
import { useCartContext } from '../CartContext';
import CartItem from '../component/CartItem'
import { useAppContext } from '../context'
import {Link, Navigate, useNavigate} from 'react-router-dom'

function Cart() {
    const {cart, clearCart} = useCartContext();
    const total = cart.reduce((a,c) => a + c.price * c.qty, 0)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/checkout')
    }

    if(cart && cart.length === 0 ) {
        return <div className='container'>
            <div className="row">
                <div className="col-md-10 mx-auto text-center">
                    cart is empty, go <Link to="/">back</Link>
                </div>
            </div>
        </div>
    }
   
    return <main>
        <div className="container">
            <section className="section my-5 pb-5">
                <div className="table-responsive">
                    <table className="table product-table">
                        <thead className="thead">
                            <tr>
                                <th></th>
                                <th className='font-weight-bold'>Product</th>
                                <th className='font-weight-bold'>Price</th>
                                <th className='font-weight-bold'>QTY</th>
                                <th className='font-weight-bold'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>

                            { cart && cart.length > 0 && cart.map(item => {
                                return <CartItem item={item} />
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                   Total amount: ${cart.reduce((a, c) => a + c.price * c.qty, 0) }
                </div>
                <button className="btn btn-primary form-control" onClick={handleClick}>Checkout</button>
                <button className="btn btn-danger form-control mt-3" onClick={clearCart}>Clear cart</button>
               
            </section>
        </div>
    </main>
}

export default Cart