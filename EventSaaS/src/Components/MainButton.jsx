import React from 'react'

function MainButton(props) {
  return (
    <button className='main-btn btn' onClick={props.onClick}>
        {props.label}
    </button>
  )
}

export default MainButton