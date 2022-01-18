import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { FaBars, FaUserAlt } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import './Navbar.css'
import { AuthConsumer } from '../AuthContext'
import { useCartContext } from '../CartContext'

const Navbar = () => {
    const [click, setClick] = useState(false);
    const { authed, logout } = AuthConsumer();
    const {cart} = useCartContext();

    const handleClick = (e) => {
        e.preventDefault();
        logout();
    }

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
                {authed ? <>
                    {/* <li className="nav-item">
                        <Link to="/" className='nav-links'>
                            Home
                        </Link>
                    </li>
                    */}
                    <li className="nav-item">
                        <Link to="/cart" className='nav-links'>
                            <span><AiOutlineShoppingCart /> { cart && cart.length }</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard" className='nav-links'>
                           <span><FaUserAlt /> </span> 
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" onClick={handleClick} className='nav-links'>
                            <span><AiOutlineLogout /></span> 
                        </Link>
                    </li>
                </> : <>
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
                        <Link to="/signin" className='nav-links'>
                            <span><AiOutlineLogin /></span> Signup
                        </Link>
                    </li>
                </>}
            </ul>
        </div>
    </nav>
}

export default Navbar
