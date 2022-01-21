import React, { createFactory, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCartContext } from '../CartContext';
import CheckoutSteps from '../component/CheckoutSteps';

function PlaceOrder() {
    const {cart, paymentMethod, shippingAddress, createOrder} = useCartContext();
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.reduce((a,c) => a + c.price * c.qty, 0))
    cart.shippingPrice = cart.price > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const navigate = useNavigate();    

    const clickHandler = () => {
        createOrder({ 
            orderItems: cart, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        });
        navigate('/')
    }

    useEffect(() => {
        if(!paymentMethod) {
            navigate('/payment')
            return;
        }
    },[])
    
  return <React.Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <section>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card mb-3">
                        <div className="card-body">

                            <h5 className="mb-4">Shipping Information</h5>

                            <p className="mb-0"> Forename: <strong>{shippingAddress.name}</strong></p>
                            <p className="mb-0"> Surname: <strong>{shippingAddress.lastname}</strong></p>
                            <p className="mb-0"> Address: <strong>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.country}</strong></p>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">

                            <h5 className="mb-4">Payment Information</h5>

                            <p className="mb-0"> Method: <strong>{paymentMethod}</strong></p>
                           
                        </div>
                    </div>

                    <div className="card wish-list mb-3">
                        <div className="card-body">

                            <h5 className="mb-4">Order Items (<span>{cart.length}</span> { cart.length === 1 ? 'item' : 'items' })</h5>

                           { cart.map(item => (
                                <div className="row mb-4">
                                <div className="col-md-5 col-lg-3 col-xl-3">
                                    <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                        <img className="img-fluid" width="200px"
                                            src={`images/products/${item.avatar}`} alt="Sample" />
                                    </div>
                                </div>
                                <div className="col-md-7 col-lg-9 col-xl-9">
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h5>{item.name}</h5>
                                                <p className="mb-3 text-muted text-uppercase small"></p>
                                                <p className="mb-2 text-muted text-uppercase small">Price: ${item.price}</p>
                                                <p className="mb-3 text-muted text-uppercase small">Quantity: {item.qty} </p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-0"><span><strong>${item.price} * {item.qty} = ${item.price * item.qty}</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           )) }
                            <hr className="mb-4" />
                        </div>
                    </div>

                    
                </div>

                <div className="col-lg-4">

                    <div className="card mb-3">
                        <div className="card-body">

                            <h5 className="mb-3">The total amount of</h5>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Temporary amount
                                    <span>
                                        ${cart.itemsPrice}
                                    </span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>${cart.shippingPrice}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Tax
                                    <span>${cart.taxPrice}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>The total amount of order</strong>
                                    </div>
                                    <span><strong>${cart.totalPrice}</strong></span>
                                </li>
                            </ul>
                            <button type="button" onClick={clickHandler} className="btn btn-primary btn-block waves-effect waves-light">Place Order</button>
                            {/* { loading && <LoadingBox />  }
                            { error && <MessageBox message={message} />  } */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
  </React.Fragment>
}

export default PlaceOrder;
