import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../CartContext';
import CheckoutSteps from '../component/CheckoutSteps';

function Checkout() {
  const {saveShippingAddress} = useCartContext()
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    saveShippingAddress({ name, lastname, country, email, city, address, phone, postalCode });
    navigate('/payment');

  }
  
  return (
    <React.Fragment>
      <CheckoutSteps step1 step2 />
      <div className="col-md-10 mx-auto">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="" className="form-label">First Name</label>
            <input type="text" class="form-control" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label" >Last Name</label>
            <input type="text" class="form-control" value={lastname} onChange={e => setLastname(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label" >Country</label> <br />
            {/* <input type="text" class="form-control" /> */}
            <select name="country" id="" value={country} onChange={e => setCountry(e.target.value)} required>
              <option value="">Select country</option>
              <option value="serbia">Serbia</option>
              <option value="croatia">Croatia</option>
              <option value="">Bosnia & Herzegovina</option>
              <option value="">Montenegro</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label" >Email</label>
            <input type="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label" >City</label>
            <input type="text" class="form-control" value={city} onChange={e => setCity(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label" >Address</label>
            <input type="text" class="form-control" value={address} onChange={e => setAddress(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label" >Postal Code</label>
            <input type="text" class="form-control" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label" >Phone</label>
            <input type="tel" class="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Checkout;
