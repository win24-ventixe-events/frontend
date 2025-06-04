import EventCard from './EventCard'
import React, { useState, useEffect } from 'react';
import { SyncLoader } from "react-spinners";


function EventContent() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const res = await fetch("https://ventixecrud-dba7bhfqd8ahcnbu.northeurope-01.azurewebsites.net/api/Event");
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error('Failed to fetch events:', err);
        } finally {
            setLoading(false);
        }
    };

    fetchEvents();
  }, []);


return (
    <>
        <h1 className='site-title'>Events</h1>
        <div className="event-content">
        {loading ? (
            <div>
                <p>Loading events...</p>
                <SyncLoader color="#F26CF9" size={60} />
            </div>
            
            ) : events && events.length > 0 ? (
                events.map((event) => (
                <EventCard 
                    key={event.id}
                    id={event.id}
                    title={event.eventName}
                    date={event.dateFrom.slice(0, 10)}
                    type={event.category}
                    location={event.location}
                    price={event.price}
                    imageUrl={event.imageUrl || '' }
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