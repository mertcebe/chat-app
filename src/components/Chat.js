import React, { useEffect, useState } from 'react'
import Message from './Message';
import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import database, { auth } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import Back from './Back';
import { toast } from 'react-toastify';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const Chat = ({ user }) => {
  let [text, setText] = useState();
  let [messages, setMessages] = useState();
  let [file, setFile] = useState();

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
  const sendMesssage = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LASTMSG",
      payload: text
    })
    let date = new Date().getTime();
    console.log(file)
    if (file || file !== undefined) {
      await submitImgToStorage(file, auth.currentUser.uid)
        .then((snapshot) => {
          let storageImg = snapshot;
          addDoc(collection(database, `chatUsers/${auth.currentUser.uid}/myTexts/${user.uid}/messages`), {
            msg: text,
            type: 'myself',
            dateAdded: date,
            img: file !== null ? storageImg : null
          })
            .then((snapshot) => {
              setTimeout(() => {
                setDoc(doc(database, `chatUsers/${user.uid}/myTexts/${auth.currentUser.uid}/messages/${snapshot.id}`), {
                  msg: text,
                  type: 'yourself',
                  dateAdded: date,
                  img: file !== null ? storageImg : null
                })
              }, 2000);
            })
        })
    }
    else {
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
    }
    setFile(undefined);

    setText('')
  }


  const submitImgToStorage = (files, uid) => {
    return new Promise((resolve, reject) => {
      files.map(async (file) => {
        const storage = getStorage();
        const metadata = {
          contentType: file.type
        };
        const storageRef = ref(storage, `${uid}/` + file.name);
        let uploadTask = await uploadBytesResumable(storageRef, file.self, metadata)
          .then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve({
                name: file.name,
                src: downloadURL
              });
            });
          })
      })
    })
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
            <div style={{ width: "100%", background: "#0c3751", color: "#fff", boxSizing: "border-box", padding: "14px 10px" }}>
              <Back />
              <small>{user.name}</small>
            </div>
            <div className='chatPart' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100vh - 94px)" }}>
              <div className='chat' style={{ height: "calc(100vh - 92px - 60px)", background: "#4e7497", overflow: "auto" }}>
                {
                  messages && messages.map((msg) => {
                    return (
                      <Message msg={msg.msg} type={msg.type} dateAdded={msg.dateAdded} user={user} img={msg.img} />
                    )
                  })
                }
              </div>
              <form onSubmit={sendMesssage} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: "5px" }}>
                <input type="text" value={text} onChange={(e) => {
                  setText(e.target.value);
                }} style={{ width: "90%", border: "none", outline: "none", height: "50px" }} placeholder='Type something...' />
                <div>
                  <input type="file" id='chatFileInput' style={{ display: "none" }} onChange={(e) => {
                    let files = [];
                    for (let file of e.target.files) {
                      files.push({
                        self: file,
                        name: file.name,
                        type: file.type
                      });
                    }
                    setFile(files);
                  }} />
                  <label type='button' htmlFor='chatFileInput' className='btn btn-sm border-0'><i className="fa-regular fa-image"></i></label>
                  <button type='submit' disabled={text || file ? false : true} className='btn btn-sm border-0' style={{ background: "#0c3751", color: "#fff", width: "70px", height: "40px" }}>Send</button>
                </div>
              </form>
            </div>
          </div>
          :
          <div className='d-flex justify-content-center align-items-center' style={{ width: "80%", height: "100vh - 42px", background: "#ecf8f9" }}>
            <i className='text-muted' style={{ pointerEvents: "none" }}>~choose contact to start messaging~</i>
          </div>
      }
    </>
  )
}

export default Chat