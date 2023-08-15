import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import database, { auth } from '../firebase/firebaseConfig'
import backImg from '../images/chatAppImg.jpg'
import backGif from '../images/chatAppGif.gif'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc } from 'firebase/firestore'

const SignInPage = () => {
  let [name, setName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  const signInFunc = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setDoc(doc(database, `chatUsers/${userCredentials.user.uid}`), {
          name: name,
          email: userCredentials.user.email
        })
          .then((snapshot) => {
            console.log("yüklendi", snapshot)
            updateProfile(userCredentials.user, {
              displayName: name
            })
            .then(() => {
              toast.success(`${userCredentials.user.displayName} have just sign in!`);
            })
          })
      })
  }
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh", background: `url(${backGif} center no-repeat)` }}>
      <div className='text-center rounded p-4' style={{ width: "25%" }}>
        <p style={{ fontSize: "21px" }}><b>Welcome to UniChat</b></p>
        <form onSubmit={signInFunc}>
          <div className="form-group mb-2">
            <input type="text" className="form-control" onChange={(e) => {
              setName(e.target.value);
            }} id="exampleInputEmail1" placeholder="Fullname" />
          </div>
          <div className="form-group mb-2">
            <input type="email" className="form-control" onChange={(e) => {
              setEmail(e.target.value);
            }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group mb-4">
            <input type="password" className="form-control" onChange={(e) => {
              setPassword(e.target.value);
            }} id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
      <div className='bg-primary' style={{ width: "40%" }}>
        {/* <img src={backGif} alt="" style={{width: "100%"}}/> */}
      </div>
    </div>
  )
}

export default SignInPage