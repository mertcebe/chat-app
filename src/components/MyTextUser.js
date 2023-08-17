import React from 'react'
import backImg from '../images/chatAppImg.jpg'
import { useDispatch } from 'react-redux'

const MyTextUser = ({findUser}) => {
  let dispatch = useDispatch();
  const openChat = () => {
    console.log(findUser);
    dispatch({
      type: "SET",
      payload: false
    })
    dispatch({
      type: "SET_USER",
      payload: findUser
    })
  }
  return (
    <button onClick={openChat} className='w-100' style={{border: "none", padding: "10px 5px", display: "flex", alignItems: "center", backgroundColor: "#0c3751", color: "#fff"}}>
        <div style={{width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", marginRight: "10px"}}>
            <img src={findUser.photoUrl?findUser.photoUrl:backImg} alt="" style={{width: "100%", height: "100%"}}/>
        </div>
        <small className='d-block'>{findUser.name}</small>
    </button>
  )
}

export default MyTextUser