import React from 'react'
import { auth } from '../firebase/firebaseConfig'
import profileImg from '../images/profileImg3.jpg'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Chat from './Chat'


const ChatsPage = () => {
  return (
    <div>
        <div className="d-flex justify-content-center">
            <NavLink to={`/options`} className="d-flex align-items-center" style={{backgroundColor: "#2b445b", textDecoration: "none", width: "20%"}}>
                <img src={auth.currentUser.photoURL?auth.currentUser.photoURL:profileImg} alt=""  style={{width: "40px", height: "40px", borderRadius: "50%", pointerEvents: "none", boxSizing: "border-box", padding: "7px"}}/>
                <small style={{color: "#fff"}}>{auth.currentUser.displayName}</small>
            </NavLink>
            <div style={{width: "80%", backgroundColor: "#42698d", color: "#fff"}}>
                <small>message part</small>
            </div>
        </div>
        <div className="d-flex">
            <Navbar />
            <Chat />
        </div>
    </div>
  )
}
// 324f6a
export default ChatsPage