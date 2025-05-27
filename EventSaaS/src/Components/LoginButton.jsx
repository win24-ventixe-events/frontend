import React from 'react'

function LoginButton(props) {
  return (
    <button className='login-btn btn'>
        {props.label}
    </button>
  )
}

export default LoginButton