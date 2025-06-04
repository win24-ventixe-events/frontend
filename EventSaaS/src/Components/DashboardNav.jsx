import LoginButton from './LoginButton'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/Logo.svg';
import MenuIcon from '../assets/images/menu-svgrepo-com.svg';

function DashboardNav() {

        const[isShown, setIsShown] = useState(false)
        const navigate = useNavigate();
        const [isAuthenticated, setIsAuthenticated] = useState(() =>
            Boolean(localStorage.getItem('jwt'))
        );

        const handleLogout = () => {
            localStorage.removeItem('jwt');
            setIsAuthenticated(false);
            navigate('/');
        }

        const handleLogin = () => {
            navigate('/login');
        };

        const handleMenu = () => {
            setIsShown(!isShown);
        }
    
return (
    <>
        <div className='dashboard-nav-container'>
            <div className='logo-container'>
                <a href="/">
                    <img src={Logo} alt="logo" />
                </a>

                <img onClick={handleMenu} className='mobile-menu' src={MenuIcon} alt="menu" />
            </div>
            <nav className={`dashboard-nav ${isShown ? "" : "hidden"}`}>
               <ul>
                    <li><NavLink className='nav-item' to="/events">Events</NavLink></li>
                    <li><NavLink className='nav-item' to="/my_bookings">Your Bookings</NavLink></li>
                </ul>
            </nav>
            <LoginButton className={isShown ? "" : "hidden"} label={isAuthenticated ? "Log Out" : "Log In"} onClick={isAuthenticated ? handleLogout : handleLogin} />
        </div>
    </>
    
)
}

export default DashboardNav