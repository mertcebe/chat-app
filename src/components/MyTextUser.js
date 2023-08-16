import React from 'react'
import backImg from '../images/chatAppImg.jpg'

const MyTextUser = ({findUser}) => {
  return (
    <li className='w-100' style={{borderBottom: "1px solid #000", borderTop: "1px solid #000", padding: "10px 5px", display: "flex", alignItems: "center", backgroundColor: "lightblue"}}>
        <div style={{width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", marginRight: "10px"}}>
            <img src={findUser.photoUrl?findUser.photoUrl:backImg} alt="" style={{width: "100%", height: "100%"}}/>
        </div>
        <small className='d-block'>{findUser.name}</small>
    </li>
  )
}

export default MyTextUser