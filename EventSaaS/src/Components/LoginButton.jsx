import React from 'react'

function LoginButton(props) {
  return (
    <button className='login-btn btn' onClick={props.onClick}>
        {props.label}
    </button>
  )
}

export default LoginButton