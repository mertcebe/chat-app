import React, { useEffect, useState } from 'react'
import backImg from '../images/chatAppImg.jpg'
import { useDispatch } from 'react-redux'
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import database, { auth } from '../firebase/firebaseConfig';
import Moment from 'react-moment';

const MyTextUser = ({ findUser }) => {
  let [lastMsg, setLastMsg] = useState("");
  let dispatch = useDispatch();
  const openChat = () => {
    dispatch({
      type: "SET",
      payload: false
    })
    dispatch({
      type: "SET_USER",
      payload: findUser
    })
  }

  useEffect(() => {
    const getLastMsg = async () => {
      await getDocs(query(collection(database, `chatUsers/${auth.currentUser.uid}/myTexts/${findUser.uid}/messages`)))
        .then((snapshot) => {
          let lastMsg = "";
          let type = "";
          let dates = [];
          let messages = [];
          snapshot.forEach((msg) => {
            messages.push(msg.data());
            dates.push(msg.data().dateAdded);
            lastMsg = msg.data().msg;
            type = msg.data().type;
          })
          dates = dates.sort().reverse();
          for (let msg of messages) {
            if (msg.dateAdded === dates[0]) {
              setLastMsg(msg);
            }
          }
        })
    }
    getLastMsg();
  }, []);

  if (!findUser) {
    if (lastMsg !== "") {
      return (
        <></>
      )
    }
  }
  return (
    <button onClick={openChat} className='w-100' style={{ border: "none", padding: "10px 5px", display: "flex", alignItems: "flex-start", backgroundColor: "#0c3751" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", marginRight: "10px" }}>
        <img src={findUser.photoURL ? findUser.photoURL : backImg} alt="" style={{ width: "100%", height: "100%" }} />
      </div>
      <div style={{ textAlign: "left" }}>
        <small className='d-block' style={{ color: "#fff" }}>{findUser.name}</small>
        <small className='m-0 p-0'>{lastMsg.msg}{lastMsg.type === 'myself' ? <i className="fa-solid fa-check"></i> : <></>}~{<Moment fromNow style={{ fontSize: "12px" }}>{lastMsg.dateAdded}</Moment>}</small>
      </div>
    </button>
  )
}

export default MyTextUser