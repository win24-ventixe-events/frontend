function MyBookingCard(props) {


return (
    <div className='event-card'>
        <div className='event-image'
        style={{ backgroundImage:`url(https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` }}>
        </div>
        <div className="event-info">
            <p className="event-title">
                {props.title}
            </p>
            <p className='event-location'>
                Location: {props.location}
            </p>
            <p className="event-date">
                Date: {props.date.slice(0,10)}
            </p>
            <p className="event-date">
                Number of tickets: {props.count}
            </p>
            <p className="support">
                For cancelling and more info contact our support
                <br />
                <a href="#">ventixe@support.com</a>
            </p>
        </div>
    </div>
)
}

export default MyBookingCard