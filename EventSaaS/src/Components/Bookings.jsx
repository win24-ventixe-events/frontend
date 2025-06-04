import React, { useState, useEffect } from 'react';
import MyBookingCard from './MyBookingCard';
import { jwtDecode } from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';
import { SyncLoader } from "react-spinners";

function Bookings() {

  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('jwt');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (!token || typeof token !== 'string'){
        console.error("Please log in.");
        localStorage.removeItem('jwt');
        navigate("/login");
        return;
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        console.error("Token expired. Please log in again.");
        localStorage.removeItem('jwt');
        navigate("/login");
        return;
      }
  
      const fetchBookings = async () => {
      try {
          const res = await fetch("https://ventixe-bookings-axaph0ajb7d6gagn.northeurope-01.azurewebsites.net/api/Booking", {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error(res.statusText);

          const data = await res.json();
          setBookings(data);
          
      } catch (err) {
          console.error('Failed to fetch events:', err);
      } finally {
          setLoading(false);
      }
  };
  
      fetchBookings();
    }, [token, navigate]);


  return (
    <>
        <h1 className='site-title'>Your Bookings</h1>
        <div className="event-content">
        {loading ? 
          (
            <div>
                <p>Loading your bookings...</p>
                <br />
                <SyncLoader color="#F26CF9" size={50} />
            </div>
                    
          ) :
            bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                  <MyBookingCard 
                      key={booking.id}
                      title={booking.eventName}
                      date={booking.date}
                      location={booking.location}
                      count={booking.numberOfTickets}
                  />
                  ))
        ) : (
            <p>You don't have any bookings yet!</p>
        )}
        </div>
    </>
  )
}

export default Bookings