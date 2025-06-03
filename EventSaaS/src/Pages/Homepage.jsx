import React from 'react'
import MainButton from '../Components/MainButton'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/Logo.svg';

function Homepage() {
  const navigate = useNavigate();

  const handleSignUp = () =>{
    navigate("/signup")
  }

  const handleBrowse =()=>{
    navigate("/events")
  }
  return (
    <div className='wrapper-homepage'>
      <img src={Logo} alt="logo" />
      <h2>Book and enjoy your favourite events.</h2>
      <div className="btn-container">
          <MainButton label="Sign Up" onClick={handleSignUp} />
          <MainButton label="Browse Events" onClick={handleBrowse} />
      </div>
      <p>Already have an account? 
        <Link to="/login"> Sign In here</Link>
      </p>
      
    </div>
  )
}

export default Homepage