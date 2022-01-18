import React from 'react'
import { useCartContext } from '../CartContext';
import CartItem from '../component/CartItem'
import { useAppContext } from '../context'

function Cart() {
    const {cart} = useCartContext();
   
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
                            }) }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </main>
}

export default Cart