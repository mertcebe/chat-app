import React from 'react'
import backImg from '../images/chatAppImg.jpg'
import profileImg from '../images/profileImg2.jpg'
import Moment from 'react-moment'
import { auth } from '../firebase/firebaseConfig'

const Message = ({ type, msg, dateAdded, user, img }) => {
    if (type === 'myself') {
        return (
            <div className='msg' style={{ display: "flex", justifyContent: "right", padding: "5px 0" }}>
                <div className='d-flex' style={{ alignItems: "flex-start" }}>
                    <div style={{ textAlign: "end" }}>
                        <div>
                            <small style={{ display: "block", backgroundColor: "lightblue", padding: "5px 14px", borderBottomLeftRadius: "10px", borderTopRightRadius: "0px", borderTopLeftRadius: "10px", borderBottomRightRadius: img ? "0" : "10px" }}>{msg}</small>
                            {
                                img ?
                                    <img src={img.src} style={{ maxWidth: "200px", backgroundColor: "lightblue", padding: "5px", borderBottomLeftRadius: "10px", borderTopRightRadius: "0px", borderTopLeftRadius: "0px", borderBottomRightRadius: "10px" }} alt='' />
                                    :
                                    <></>
                            }
                        </div>
                        <small style={{ display: "block", textAlign: "right", opacity: "0.6", fontSize: "10px" }}>{<Moment fromNow>{dateAdded}</Moment>}</small>
                    </div>
                    <div style={{ paddingRight: "5px" }}>
                        <img src={auth.currentUser.photoURL} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%", marginLeft: "10px" }} />
                    </div>
                </div>
            </div>
        )
    }
    if (type === 'yourself') {
        return (
            <div className='msg' style={{ display: "flex", justifyContent: "left", padding: "5px 0" }}>
                <div className='d-flex'>
                    <div>
                        <img src={user ? user.photoURL : profileImg} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />
                    </div>
                    <div style={{ textAlign: "start" }}>
                        <div>
                            <small style={{ display: "block", backgroundColor: "lightblue", padding: "5px 14px", borderBottomLeftRadius: img ? "0" : "10px", borderTopRightRadius: "10px", borderTopLeftRadius: "0px", borderBottomRightRadius: "10px" }}>{msg}</small>
                            {
                                img ?
                                    <img src={img.src} style={{ maxWidth: "200px", backgroundColor: "lightblue", padding: "5px", borderBottomLeftRadius: "10px", borderTopRightRadius: "0px", borderTopLeftRadius: "0px", borderBottomRightRadius: "10px" }} alt='' />
                                    :
                                    <></>
                            }
                        </div>
                        <small style={{ display: "block", textAlign: "left", opacity: "0.6", fontSize: "10px" }}>{<Moment fromNow>{dateAdded}</Moment>}</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Message