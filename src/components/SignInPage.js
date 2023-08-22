import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import database, { auth } from '../firebase/firebaseConfig'
import backImg from '../images/chatAppImg.jpg'
import backGif from '../images/chatAppGif.gif'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link } from 'react-router-dom'


export const submitImgToStorage = (files, uid, name) => {
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
              src: downloadURL
            });
          });
        })
    })
  })
}

const SignInPage = ({ type }) => {
  let [name, setName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [files, setFiles] = useState();

  const registerFunc = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        await submitImgToStorage(files, userCredentials.user.uid, name)
          .then(async (uploadedImg) => {
            updateProfile(userCredentials.user, {
              displayName: name,
              photoURL: uploadedImg.src
            })
            console.log(uploadedImg.src);
            await setDoc(doc(database, `chatUsers/${userCredentials.user.uid}`), {
              name: name,
              email: userCredentials.user.email,
              uid: userCredentials.user.uid,
              photoURL: uploadedImg.src
            })
          })
          .then(() => {
            toast.success(`${userCredentials.user.displayName}, welcome!`);
          })
      })
  }

  const signInFunc = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      toast.success(`${userCredentials.user.displayName}, welcome back!`);
    })
  }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh", background: `url(${backGif} center no-repeat)` }}>
      <div className='text-center rounded p-4' style={{ width: "25%" }}>
        <p style={{ fontSize: "21px" }}><b>Welcome to UniChat</b></p>
        <form onSubmit={type === 'register'?registerFunc:signInFunc}>
          {
            type === 'register' ?
              <div className="form-group mb-2">
                <input type="text" className="form-control" onChange={(e) => {
                  setName(e.target.value);
                }} id="exampleInputEmail1" placeholder="Fullname" />
              </div>
              :
              <></>
          }
          <div className="form-group mb-2">
            <input type="email" className="form-control" onChange={(e) => {
              setEmail(e.target.value);
            }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group mb-2">
            <input type="password" className="form-control" onChange={(e) => {
              setPassword(e.target.value);
            }} id="exampleInputPassword1" placeholder="Password" />
          </div>
          {
            type === 'register' ?
              <div className="form-group my-3">
                <input type="file" className="form-control" style={{ display: "none" }} onChange={(e) => {
                  let files = [];
                  for (let file of e.target.files) {
                    files.push({
                      self: file,
                      name: file.name,
                      type: file.type
                    });
                  }
                  setFiles(files);
                }} id="exampleInputFile1" />
                <label className='btn btn-sm border-0' style={{ color: "#f12221", opacity: "0.7" }} htmlFor='exampleInputFile1'><i class="fa-solid fa-image"></i> Add an avatar</label>
              </div>
              :
              <></>
          }
          <button type="submit" className="btn btn-primary">{type === 'register'?'Sign up':'Sign in'}</button>
          <div className='text-center my-2'>
            <small>or {type === 'register'?<Link to={`/`} style={{textDecoration: "none", color: "red"}}>sign in</Link>:<Link to={`/register`} style={{textDecoration: "none", color: "red"}}>register</Link>}</small>
          </div>
        </form>
      </div>
      <div className='bg-primary' style={{ width: "40%" }}>
        <img src={backGif} alt="" style={{ width: "100%" }} />
      </div>
    </div>
  )
}

export default SignInPage