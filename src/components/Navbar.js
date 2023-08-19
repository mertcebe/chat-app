import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import database, { auth } from '../firebase/firebaseConfig'
import { NavLink } from 'react-router-dom'
import { collection, doc, endAt, getDoc, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import MyTextUser from './MyTextUser'

const Navbar = () => {
    let [users, setUsers] = useState();
    let [myTextsUsers, setMyTextsUsers] = useState();
    let [text, setText] = useState();
    let [findUser, setFindUser] = useState();

    let dispatch = useDispatch();
    let isAllUsers = useSelector((state) => {
        return state.allUsers;
    })
    useEffect(() => {
        const getUsers = async () => {
            getDocs(query(collection(database, `chatUsers/${auth.currentUser.uid}/friends`)))
                .then((snapshot) => {
                    let users = [];
                    let myTextsUsers = [];
                    snapshot.forEach(async (user) => {
                        users.push(user.data());
                        // the last people i texted
                        await getDocs(query(collection(database, `chatUsers/${auth.currentUser.uid}/myTexts/${user.data().uid}/messages`)))
                            .then((snapshot) => {
                                if (snapshot.size !== 0) {
                                    myTextsUsers.push(user.data());
                                }
                            })
                        setMyTextsUsers(myTextsUsers)
                    })
                    setUsers(users);
                })
        }
        getUsers();
    }, []);

    // find user part
    const getUser = (uid) => {
        getDoc(doc(database, `chatUsers/${uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let count = 0;
                    for (let user of myTextsUsers) {
                        if (user.uid === snapshot.data().uid) {
                            count += 1;
                        }
                    }
                    if (count == 0) {
                        setFindUser(snapshot.data());
                    }
                }
            })
    }

    if (!users) {
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <div className='d-flex justify-content-between' style={{ height: "calc(100vh - 40px)", background: "#324f6a", flexDirection: "column", width: "20%" }}>
            <div >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    for (let user of users) {
                        if (user.name === text) {
                            getUser(user.uid)
                        }
                    }
                }}><Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={users.map((option) => option.name)}
                        renderInput={(params) => (
                            <TextField
                                id='myInput'
                                {...params}
                                label="find firends"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                                style={{ margin: "5px 0" }}
                                onSelect={(e) => {
                                    setText(e.target.value);
                                }}
                            />
                        )}
                    /></form>

                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {/* find a friend */}
                    {
                        findUser ?
                            <MyTextUser findUser={findUser} />
                            :
                            <></>
                    }
                    {/* the people who text */}
                    {
                        myTextsUsers ?
                            myTextsUsers.map((user) => {
                                return <MyTextUser findUser={user} />
                            })
                            :
                            <i>No messages</i>
                    }
                </ul>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <button className='btn btn-sm' onClick={() => {
                    signOut(auth);
                }} style={{ width: "70px", border: "none", backgroundColor: "#42698d", padding: "0 10px", margin: "10px", color: "#fff" }}>logout</button>
                <button onClick={() => {
                    dispatch({
                        type: "SET",
                        payload: !isAllUsers
                    })
                }} style={{ border: "none", borderRadius: "5px", backgroundColor: "#42698d", padding: "0 10px", margin: "10px", color: "#fff", textDecoration: "none", fontSize: "14px" }}>{isAllUsers ? "Chat" : "All Users"}</button>
            </div>
        </div>
    )
}

export default Navbar