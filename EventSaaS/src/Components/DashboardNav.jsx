import LoginButton from './LoginButton'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function DashboardNav() {

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
    
return (
    <div className='dashboard-nav-container'>
        <div className='logo-container'>
            <a href="/">
                <img src="./src/assets/images/Logo.svg" alt="logo" />
            </a>
        </div>
        <nav className="dashboard-nav">
            <ul>
                <li><a className='nav-item' href="/#/events">Events</a></li>
                <li><a className='nav-item' href="/#/my_bookings">Your Bookings</a></li>
            </ul>
        </nav>
        <LoginButton label={isAuthenticated ? "Log Out" : "Log In"} onClick={isAuthenticated ? handleLogout : handleLogin} />
    </div>
)
}

export default DashboardNav