import React, { useEffect, useState } from 'react'
import Message from './Message';
import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import database, { auth } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import Back from './Back';

const Chat = ({ user }) => {
  let [text, setText] = useState();
  let [messages, setMessages] = useState();
  useEffect(() => {
    if (user) {
      getDocs(query(collection(database, `chatUsers/${auth.currentUser.uid}/myTexts/${user.uid}/messages`), orderBy('dateAdded', 'asc')))
        .then((snapshot) => {
          let messages = [];
          snapshot.forEach((msg) => {
            messages.push(msg.data());
          })
          setMessages(messages);
        })
    }
  }, [user, messages]);

  let dispatch = useDispatch();
  const sendMesssage = (e) => {
    dispatch({
      type: "SET_LASTMSG",
      payload: text
    })
    e.preventDefault();
    console.log(text)
    let date = new Date().getTime();
    addDoc(collection(database, `chatUsers/${auth.currentUser.uid}/myTexts/${user.uid}/messages`), {
      msg: text,
      type: 'myself',
      dateAdded: date
    })
      .then((snapshot) => {
        setDoc(doc(database, `chatUsers/${user.uid}/myTexts/${auth.currentUser.uid}/messages/${snapshot.id}`), {
          msg: text,
          type: 'yourself',
          dateAdded: date
        })
      })

    setText('')
  }
  if (user) {
    if (!messages) {
      return (
        <h5>loading...</h5>
      )
    }
  }
  return (
    <>
      {
        user ?
          <div style={{ width: "80%", position: "relative" }}>
            <Back top={10} left={100} />
            <div style={{ width: "100%", background: "#0c3751", color: "#fff", boxSizing: "border-box", padding: "14px 10px" }}>
              <small>{user.name}</small>
            </div>
            <div className='chatPart' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100vh - 92px)" }}>
              <div className='chat' style={{ height: "calc(100vh - 92px - 60px)", background: "#4e7497", overflow: "auto" }}>
                {
                  messages.map((msg) => {
                    return (
                      <Message msg={msg.msg} type={msg.type} dateAdded={msg.dateAdded} />
                    )
                  })
                }
              </div>
              <form onSubmit={sendMesssage} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: "5px" }}>
                <input type="text" value={text} onChange={(e) => {
                  setText(e.target.value);
                }} style={{ width: "90%", border: "none", outline: "none", height: "50px" }} placeholder='Type something...' />
                <div>
                  <button type='button' className='btn btn-sm border-0'><i className="fa-regular fa-image"></i></button>
                  <button type='submit' className='btn btn-sm border-0' style={{ background: "#0c3751", color: "#fff", width: "70px", height: "40px" }}>Send</button>
                </div>
              </form>
            </div>
          </div>
          :
          <div className='d-flex justify-content-center align-items-center' style={{ width: "80%", height: "100vh - 42px", background: "#ecf8f9" }}>
            <i className='text-muted' style={{pointerEvents: "none"}}>~choose contact to start messaging~</i>
          </div>
      }
    </>
  )
}

export default Chat