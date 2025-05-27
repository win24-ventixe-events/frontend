import React from 'react'
import MainButton from './MainButton'

function EventCard(props) {
  return (
    <div className='event-card'>
        <div className='event-image'>
        </div>
        <div className="event-info">
            <p className="event-title">
                {props.title}
            </p>
            <p className='event-type'>
                {props.type}
            </p>
            <p className='event-location'>
                {props.location}
            </p>
            <p className="event-date">
                {props.date}
            </p>
            <p className="event-price">
                {props.price}
            </p>
        </div>
            <MainButton label="Info & Buy" />
    </div>
  )
}

export default EventCard