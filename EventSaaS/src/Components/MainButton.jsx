import React from 'react'

function MainButton(props) {
  return (
    <button className='main-btn btn'>
        {props.label}
    </button>
  )
}

export default MainButton