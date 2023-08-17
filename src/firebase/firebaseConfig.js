import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB_npOsUw9Vy3LIJ2ixUDx2iTgJxpnafJo",
  authDomain: "react-chat-app-846d1.firebaseapp.com",
  projectId: "react-chat-app-846d1",
  storageBucket: "react-chat-app-846d1.appspot.com",
  messagingSenderId: "813205727626",
  appId: "1:813205727626:web:6cf86a7041989e87f84073",
  measurementId: "G-BRD6MMJV9N"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore();

const auth = getAuth();

const provider = new GoogleAuthProvider();

export {database as default, auth, provider}