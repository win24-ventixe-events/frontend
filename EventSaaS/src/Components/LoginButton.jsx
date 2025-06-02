import React from 'react'

function LoginButton(props) {
  return (
    <button className={`btn login-btn ${props.className}`} onClick={props.onClick}>
        {props.label}
    </button>
  )
}

export default LoginButton