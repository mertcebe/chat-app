import React, { useEffect } from 'react'
import { auth } from '../firebase/firebaseConfig'
import profileImg from '../images/profileImg3.jpg'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Chat from './Chat'
import AllUsersPage from './AllUsersPage'
import { useSelector } from 'react-redux'


const ChatsPage = ({ allUsers }) => {
    let isAllUsers = useSelector((state) => {
        return state.allUsers;
    })
    useEffect(() => {
        if (allUsers) {

        }
    }, []);
    return (
        <div>
            <div className="d-flex justify-content-center">
                <NavLink to={`/options`} className="d-flex align-items-center" style={{ backgroundColor: "#2b445b", textDecoration: "none", width: "20%" }}>
                    <img src={auth.currentUser.photoURL ? auth.currentUser.photoURL : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", pointerEvents: "none", boxSizing: "border-box", padding: "7px" }} />
                    <small style={{ color: "#fff" }}>{auth.currentUser.displayName}</small>
                </NavLink>
                <div style={{ width: "80%", backgroundColor: "#42698d", color: "#fff" }}>
                    <small>message part</small>
                </div>
            </div>
            <div className="d-flex" style={{position: "relative"}}>
                <Navbar />
                {
                    isAllUsers ?
                        <AllUsersPage />
                    :
                        <Chat />
                }
            </div>
        </div>
    )
}

export default ChatsPage