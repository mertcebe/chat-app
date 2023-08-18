import React from 'react'
import { useDispatch } from 'react-redux'

const Back = ({top, left}) => {
  let dispatch = useDispatch();
  const func = () => {
    dispatch({
      type: "SET",
      payload: false
    })
    dispatch({
      type: "SET_USER",
      payload: null
    })
  }
  return (
    <div style={{position: "absolute", top: `${top}px`, left: `${left}px`}}>
        <button className='btn btn-sm btn-outline-light' onClick={func}><i class="fa-solid fa-chevron-left"></i></button>
    </div>
  )
}

export default Back