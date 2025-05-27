import React from 'react'
import EventCard from './EventCard'

function EventContent({ events }) {
  return (
    <div className="event-content">
      {events && events.length > 0 ? (
        events.map((event, index) => (
          <EventCard 
            key={event.id || index}
            title={event.title}
            date={event.date}
            type={event.type}
            location={event.location}
            price={event.price}
          />
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  )
}

export default EventContent