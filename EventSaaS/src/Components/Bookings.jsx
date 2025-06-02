import React, { useState, useEffect } from 'react';
import MyBookingCard from './MyBookingCard';
import { jwtDecode } from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';

function Bookings() {

  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('jwt');

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
          const res = await fetch("http://localhost:5244/api/Booking", {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setBookings(data);
      } catch (err) {
          console.error('Failed to fetch events:', err);
      }
  };
  
      fetchBookings();
    }, [token]);


  return (
    <>
        <h1 className='site-title'>Events</h1>
        <div className="event-content">
        {bookings && bookings.length > 0 ? (
            bookings.map((event) => (
                <MyBookingCard 
                    key={event.id}
                    title={event.eventName}
                    date={event.date}
                    location={event.location}
                    count={event.numberOfTickets}
                />
                ))
        ) : (
            <p>You dont have any bookings yet!</p>
        )}
        </div>
    </>
  )
}

export default Bookings