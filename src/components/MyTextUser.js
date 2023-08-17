import React, { useEffect, useState } from 'react'
import backImg from '../images/chatAppImg.jpg'
import { useDispatch } from 'react-redux'
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import database, { auth } from '../firebase/firebaseConfig';

const MyTextUser = ({ findUser }) => {
  let [lastMsg, setLastMsg] = useState();
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

  useEffect(() => {
    getDocs(query(collection(database, `chatUsers/${auth.currentUser.uid}/myTexts/${findUser.uid}/messages`)), orderBy("dateAdded", 'asc'), limit(1))
      .then((snapshot) => {
        let lastMsg = "";
        snapshot.forEach((msg) => {
          lastMsg = msg.data().msg;
        })
        setLastMsg(lastMsg);
      })
  }, [lastMsg]);

  if(!lastMsg){
    return (
      <></>
    )
  }
  return (
    <button onClick={openChat} className='w-100' style={{ border: "none", padding: "10px 5px", display: "flex", alignItems: "flex-start", backgroundColor: "#0c3751" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", marginRight: "10px" }}>
        <img src={findUser.photoUrl ? findUser.photoUrl : backImg} alt="" style={{ width: "100%", height: "100%" }} />
      </div>
      <div style={{ textAlign: "left" }}>
        <small className='d-block' style={{ color: "#fff" }}>{findUser.name}</small>
        <small className='m-0 p-0'>{lastMsg}</small>
      </div>
    </button>
  )
}

export default MyTextUser