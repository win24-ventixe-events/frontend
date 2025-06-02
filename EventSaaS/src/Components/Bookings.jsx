import React, { useState, useEffect } from 'react';
import MyBookingCard from './MyBookingCard';

function Bookings() {

  const [bookings, setBookings] = useState([]);
  
      useEffect(() => {
          const fetchBookings = async () => {
          try {
              const token = localStorage.getItem('jwt');
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
    }, []);


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