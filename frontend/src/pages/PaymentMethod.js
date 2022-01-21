import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../CartContext';
import CheckoutSteps from '../component/CheckoutSteps';

function PaymentMethod() {
    const [method, setMethod] = useState('');
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const { savePaymentMethod, shippingAddress } = useCartContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!method) {
            setError('Please choose payment method.')
            return;
        }
        savePaymentMethod(method)
        console.log(method)
        navigate('/placeorder')
    }

    useEffect(() => {
        if(shippingAddress && Object.keys(shippingAddress).length === 0) {
            console.log('errror')
            navigate('/checkout')
            return;
        }
    },[])

    return <React.Fragment>
        <CheckoutSteps step1 step2 step3 />
        <div className="container">
            <div className="row">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="col-md-10 mt-5 d-flex mx-auto justify-content-center">
                        <div className='me-5'>
                            <label htmlFor="" className="form-label" >PayPal</label>
                            <input type="radio" name="payment" value={'PayPal'} onChange={e => setMethod(e.target.value)} />
                        </div>
                        <div className='me-5'>
                            <label htmlFor="" className="form-label" >CreditCard</label>
                            <input type="radio" name="payment" value={'CreditCard'} onChange={e => setMethod(e.target.value)} />
                        </div>
                        <div className='me-5'>
                            <label htmlFor="" className="form-label" >Cash</label>
                            <input type="radio" name="payment" value={'Cash'} onChange={e => setMethod(e.target.value)} />
                        </div>

                    </div>
                    <div className="col-md-10 mx-auto mt-5 d-flex justify-content-center">
                        <button className="btn btn-primary mx-auto" type="submit">Next</button>
                    </div>
                </form>
            </div>
        </div>;
    </React.Fragment>
}

export default PaymentMethod;
