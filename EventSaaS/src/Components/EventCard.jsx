import React from 'react'
import MainButton from './MainButton'
import { useNavigate } from 'react-router-dom';

function EventCard(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/more_info", {state: {...props}});
    }

  return (
    <div className='event-card'>
        <div className='event-image'
        style={{ backgroundImage:`url(${props.imageUrl})` }}>
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
            <MainButton label="Info & Buy" onClick={handleClick} />
    </div>
  )
}

export default EventCard