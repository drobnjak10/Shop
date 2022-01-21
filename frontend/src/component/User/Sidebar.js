import React from 'react'
import { AiFillDashboard } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { AuthConsumer } from '../../AuthContext'

function Sidebar() {
    const {isAdmin} = AuthConsumer();
    
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ height: "100%" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4"><AiFillDashboard /> Dash</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link text-white" aria-current="page">
                        Overview
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/users" className="nav-link text-white" >
                        Users
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/products" className="nav-link text-white">
                        Products
                    </Link>
                </li>

                { isAdmin &&  <li>
                    <Link to="/dashboard/new" className="nav-link text-white">
                        New Item
                    </Link>
                </li> }
                
                <li>
                    <Link to="/dashboard" className="nav-link text-white">
                        Customers
                    </Link>
                </li>
            </ul>
            <hr />
        </div>
    )
}

export default Sidebar
