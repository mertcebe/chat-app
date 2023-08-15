import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBv8GTG8vmaJ12E5f2Xw2JjxGHIupclKas",
  authDomain: "chat-app-5acfb.firebaseapp.com",
  projectId: "chat-app-5acfb",
  storageBucket: "chat-app-5acfb.appspot.com",
  messagingSenderId: "822183952153",
  appId: "1:822183952153:web:2965b963e25c89ca8f0f88",
  measurementId: "G-5EBCMZRD5P"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore();

const auth = getAuth();

const provider = new GoogleAuthProvider();

export {database as default, auth, provider}