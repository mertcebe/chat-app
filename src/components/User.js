import { Button } from '@mui/material'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import database, { auth } from '../firebase/firebaseConfig'
import { toast } from 'react-toastify'

const User = ({ user }) => {
    let [myUser, setMyUser] = useState();
    useEffect(() => {
        const controlUser = async () => {
            getDoc(doc(database, `chatUsers/${auth.currentUser.uid}/friends/${user.name}`))
                .then((snapshot) => {
                    console.log(snapshot.data());
                    if (snapshot.exists()) {
                        setMyUser(snapshot.data());
                    }
                })
        }
        controlUser();
    }, []);
    const addFriend = () => {
        setDoc(doc(database, `chatUsers/${auth.currentUser.uid}/friends/${user.name}`), user)
            .then(() => {
                toast.success("Successfully add to my friends!");
            })
    }
    if(myUser){
        if(myUser.name === user.name){
            return (
                <></>
            )
        }
    }
    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <Button className="card-link" onClick={addFriend}>Add to my firends</Button>
            </div>
        </div>
    )
}

export default User