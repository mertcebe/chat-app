import React from 'react'
import { useDispatch } from 'react-redux'

const Back = ({ top, left }) => {
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
    <button className='' style={{display: "inline-block", marginRight: "10px", border: "none", width: "20px", height: "20px", fontSize: "10px", borderRadius: "50%", backgroundColor: "#fff"}} onClick={func}><i class="fa-solid fa-chevron-left"></i></button>
  )
}

export default Back