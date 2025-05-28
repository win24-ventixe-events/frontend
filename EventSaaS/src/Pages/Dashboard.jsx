import { useEffect, useState } from 'react';
import DashboardNav from '../Components/DashboardNav'
import { jwtDecode } from 'jwt-decode';

function Dashboard({ ContentComponent }) {

    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.displayName);
                
            } catch (error) {
                console.error("Failed to decode JWT:", error);
            }
        }
    }, []);

    return (
        <div className='wrapper dashboard'>
            <DashboardNav />
            <div className="title-section">
                <p className="welcome-msg">
                    Welcome, {userName}
                </p>
            </div>
            {ContentComponent ? <ContentComponent /> : <div>Sorry there has been an error</div>}
        </div>
    )
}

export default Dashboard