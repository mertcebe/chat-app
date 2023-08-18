import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDOXySlnToZ2V4yZWtrpAFwx7E1Sp9pPqc",
  authDomain: "new-chat-app-d1ee0.firebaseapp.com",
  projectId: "new-chat-app-d1ee0",
  storageBucket: "new-chat-app-d1ee0.appspot.com",
  messagingSenderId: "272352021582",
  appId: "1:272352021582:web:6844122736d9577bb9871f",
  measurementId: "G-C9133VV24Z"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore();

const auth = getAuth();

const provider = new GoogleAuthProvider();

export {database as default, auth, provider}