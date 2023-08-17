import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCsRIoQOUce8x89gqUMFw_W3lRV161djo4",
  authDomain: "mychat-app-ff393.firebaseapp.com",
  projectId: "mychat-app-ff393",
  storageBucket: "mychat-app-ff393.appspot.com",
  messagingSenderId: "945184924687",
  appId: "1:945184924687:web:bc77870d29b5a1cb6aaf7a",
  measurementId: "G-N6SZL61966"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore();

const auth = getAuth();

const provider = new GoogleAuthProvider();

export {database as default, auth, provider}