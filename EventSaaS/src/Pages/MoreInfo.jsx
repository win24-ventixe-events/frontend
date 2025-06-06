import React, { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import MainButton from '../Components/MainButton';
import { jwtDecode } from 'jwt-decode';
import LeftArrow from "../assets/images/arrow-left-5-svgrepo-com.svg"
import Logo from '../assets/images/Logo.svg';
import { SyncLoader } from "react-spinners";

function MoreInfo() {

  const navigate = useNavigate();
  const locationHook = useLocation();
  const eventData = locationHook.state;
  const [numTickets, setNumTickets] = useState(1);
  const [loading, setLoading] = useState(false);
 
  const handleBookAndPay = async () =>{

    const token = localStorage.getItem('jwt');
    if(token === null) {
      alert("You need to login to be able to book")
      navigate('/login');
    }
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        console.error("Token has expired. Please log in again.");
        localStorage.removeItem('jwt');
        return;
    }

    const bookingData = {
      eventName: eventData.title,
      eventId: eventData.id,
      userEmail: decodedToken.email,
      userId: decodedToken.sub,
      date: eventData.date,
      location: eventData.location,
      numberOfTickets: numTickets
    }

    try {
      setLoading(true);
      const response = await fetch('https://ventixe-bookings-axaph0ajb7d6gagn.northeurope-01.azurewebsites.net/api/Booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
      });
      
      if (response.ok) {
        navigate('/success');
      } else {
        console.error('Booking failed with status:', response.status);
      }

    } catch {
        console.log("something went wrong")
    }
}

const handleTicketChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }
    setNumTickets(value);
};

  return (
    <div className='more-info-container more-info-wrapper'>
      <Link to="/events" className='back-to-events'>
        <span>
          <img src={LeftArrow} alt="event image" />
          </span>Back to Events</Link>
      <div className='more-info-img'>
        <img src={eventData.imageUrl} alt="event image" />
      </div>
      <h1>{eventData.title}
        <br />
        <span className='event-id'> (event ID: {eventData.id})
          </span>
      </h1>
      <div className="more-info-txt">
          <p className='more-info-price'>
            <span>Category:</span> {eventData.type}
          </p>
          <p className='more-info-date'>
            <span>Date:</span> {eventData.date}
          </p>
          <p className='more-info-description'>
            <span>Event Info:</span> {eventData.description}
          </p>
          <p className='more-info-location'>
            <span>Location:</span> {eventData.location}
          </p>
          <p className='more-info-price'>
            <span>Price per ticket:</span> {eventData.price}€
          </p>
      </div>
      
      <p className='terms-and-conditions'> Event booking and tickets handles by 
        <span className='img-in-text'>
          <img src={Logo} alt="logo" />
        </span>
        <a href="#">terms and condition applies.</a></p>
        <div className='book-and-pay'>
          <div className='ticket-selector'>
            <label htmlFor="numTickets">Tickets (1-10): </label>
                <input
                  type="number"
                  id="numTickets"
                  name="numTickets"
                  value={numTickets}
                  onChange={handleTicketChange}
                  min="1"
                  max="10"
                  required
                />
          </div>

          {loading && <div>
                        <p>Booking your tickets...</p>
                        <br />
                        <SyncLoader color="#F26CF9" size={50} />
                      </div>
          }

        <MainButton label={"Book And Pay"}  onClick={handleBookAndPay} />
        </div>
        
    </div>
  )
}

export default MoreInfo