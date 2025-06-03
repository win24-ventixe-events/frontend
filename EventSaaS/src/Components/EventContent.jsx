import EventCard from './EventCard'
import React, { useState, useEffect } from 'react';

function EventContent() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const res = await fetch("https://crud-ventixe-e9d0htc7azdeaqhv.northeurope-01.azurewebsites.net/api/Event");
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error('Failed to fetch events:', err);
        }
    };

    fetchEvents();
  }, []);


return (
    <>
        <h1 className='site-title'>Events</h1>
        <div className="event-content">
        {events && events.length > 0 ? (
            events.map((event) => (
                <EventCard 
                    key={event.id}
                    id={event.id}
                    title={event.eventName}
                    date={event.dateFrom.slice(0, 10)}
                    type={event.category}
                    location={event.location}
                    price={event.price}
                    imageUrl={event.imageUrl}
                    description={event.description}
                />
                ))
        ) : (
            <p>No events available</p>
        )}
    </div>
    </>
    
)
}

export default EventContent