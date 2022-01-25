import React from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../CartContext';
import { useAppContext } from '../context';
import Loading from './Loading';

function Product({product}) {
    const {_id, name, avatar, price} = product;
    const {addToCart} = useCartContext();

    
    
    return (
        <div className="col-md-4 mb-3" key={_id}>
            <div className="card" style={{ width: "18rem" }}>
                    <img src={`images/products/${avatar}`} className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        <Link className='btn btn-primary' to={`product/${_id}`}>View Details</Link>
                        <button className='btn btn-primary ms-2' onClick={() => {
                            addToCart(_id, 1)
                        }}>
                            Add To Cart
                        </button>
                    </div>
                    <div className="card-footer bg-white">
                        <p>{price}$</p>
                    </div>
                    
            </div>
        </div>
    )
}

export default Product
