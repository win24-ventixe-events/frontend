import { useNavigate } from 'react-router-dom';
import MainButton from '../Components/MainButton'


function Success() {

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/my_bookings");
    }
return (
    <div className="success-wrapper">
        <p>Your have successfully booked an event!</p>
        <MainButton label="My Bookings" onClick={handleClick} />
    </div>
)
}

export default Success