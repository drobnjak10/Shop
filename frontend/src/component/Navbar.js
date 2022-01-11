import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import './Navbar.css'

const Navbar = () => {
    const [click, setClick] = useState(false);

    return <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className='navbar-logo'>
                E-SHOP <FiShoppingBag />
            </Link>
            <div className="menu-icon">
                <button className='toggle-btn' onClick={() => setClick(!click)}>
                    {click ? <AiOutlineClose /> : <FaBars />}
                </button>
            </div>
            <ul className={`${click ? "nav-menu active" : 'nav-menu'}`}>
                <li className="nav-item">
                    <Link to="/" className='nav-links'>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/services" className='nav-links'>
                        Services
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/products" className='nav-links'>
                        Products
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/signup" className='nav-links'>
                        Signup
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
}

export default Navbar
