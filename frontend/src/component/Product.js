import React from 'react'
import { Link } from 'react-router-dom'

function Product() {
    return (
        <div className="col-4 mb-3">
        <div className="card" style={{width: "18rem"}}>
        <Link to="/product">
            <img src="ipad.jpg" className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
            <div className="card-footer bg-white">
                <p>560$</p>
            </div>
        </Link>
        </div>
    </div>           
    )
}

export default Product
