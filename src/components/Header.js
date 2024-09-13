import React from 'react';
import "../App.css"
import { NavLink } from 'react-router-dom';

function Header({isLoggedIn, setIsLoggedIn}) {
    const handleLogin= () => {
        setIsLoggedIn(!isLoggedIn)
        
    }

    return (
        <div id='header'>
            <NavLink to="/"  className="nav_link">Home</NavLink>
            {isLoggedIn && <NavLink to="/products" className="nav_link">Products</NavLink>}
            <NavLink to="/contact" className="nav_link">Contacts</NavLink>
            <button id='login_btn' onClick={handleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>
        </div>
    );
}

export default Header;