import { Button } from '@mui/material'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import database, { auth } from '../firebase/firebaseConfig'
import { toast } from 'react-toastify'
import { addFriend } from './FriendsRequests'

const User = ({ user }) => {
    let [myUser, setMyUser] = useState();
    useEffect(() => {
        const controlUser = async () => {
            getDoc(doc(database, `chatUsers/${auth.currentUser.uid}/friends/${user.name}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setMyUser(snapshot.data());
                    }
                })
        }
        controlUser();
    }, []);
    const sendFriendRequest = () => {
        let { displayName, email, photoURL, uid } = auth.currentUser;
        setDoc(doc(database, `chatUsers/${user.uid}/friendRequests/${auth.currentUser.uid}`), {
            name: displayName,
            email: email,
            photoURL: photoURL,
            uid: uid
        })
            .then(() => {
                toast.success(`Successfully send friend request to ${user.name}`);
            })
    }
    if (myUser) {
        if (myUser.name === user.name) {
            return (
                <></>
            )
        }
    }
    return (
        <div className="card" id='userCard' style={{ width: "18rem", margin: "5px", boxShadow: user.requests?"1px 4px 5px lightblue":"1px 4px 5px #dcdcdc", position: "relative" }}>
            <img src={user.photoURL} style={{ width: "70px", height: "70px", borderBottomLeftRadius: "50%", position: "absolute", right: "0", top: "0", opacity: "1", zIndex: "1" }} alt="" />
            <div className="card-body" style={{ zIndex: "100" }}>
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                {
                    user.requests ?
                        <Button className="card-link" onClick={() => {
                            addFriend(user);
                        }}>Accept the request</Button>
                        :
                        <Button className="card-link" onClick={sendFriendRequest}>Add to my firends</Button>
                }
            </div>
        </div>
    )
}

export default User