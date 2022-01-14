import React from 'react'
import { Link } from 'react-router-dom'

function Product({product}) {
    const {_id, name, avatar, description, price} = product;
    return (
        <div className="col-4 mb-3" key={_id}>
            <div className="card" style={{ width: "18rem" }}>
                <Link to="/product">
                    <img src={`images/products/${avatar}`} className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        <Link className='btn btn-primary' to={`product/${_id}`}>View Details</Link>
                    </div>
                    <div className="card-footer bg-white">
                        <p>{price}$</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Product
