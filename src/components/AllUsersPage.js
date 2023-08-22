import React, { useEffect, useState } from 'react'
import ChatsPage from './ChatsPage'
import database, { auth } from '../firebase/firebaseConfig'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import User from './User'

const AllUsersPage = () => {
    let [users, setUsers] = useState();
    let [friendRequests, setFriendRequests] = useState();
    let [updatedUsers, setUpdatedUsers] = useState();
    useEffect(() => {
        const getAllUsers = async() => {
            let users = [];
            let friendRequests = [];
            let updatedUsers = [];
            await getDocs(query(collection(database, `chatUsers`), where('email', '!=', auth.currentUser.email)))
                .then((snapshot) => {
                    snapshot.forEach((user) => {
                        users.push(user.data());
                    })
                    setUsers(users);
                })
                .then(async () => {
                    await getDocs(query(collection(database, `chatUsers/${auth.currentUser.uid}/friendRequests`)))
                        .then(async (snapshot) => {
                            snapshot.forEach((user) => {
                                friendRequests.push(user.data());
                            })
                            setFriendRequests(friendRequests);
                            for (let user of users) {
                                for (let fUser of friendRequests) {
                                    console.log(user.uid, fUser.uid)
                                    if (user.uid === fUser.uid) {
                                        updatedUsers.push({
                                            ...user,
                                            requests: true
                                        });
                                    }
                                    else {
                                        updatedUsers.push(user);
                                    }
                                }
                            }
                            setUpdatedUsers(friendRequests.length === 0?users:updatedUsers);
                        })
                })
        }
        getAllUsers();

    }, []);
    if (!updatedUsers) {
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <div className='d-flex justify-content-center align-items-start' style={{ flexWrap: "wrap", width: "80%", height: `${(users.length / 4) * 100}px` }}>
            {
                updatedUsers.map((user, index) => {
                    return <User key={index} user={user} />
                })
            }
        </div>
    )
}

export default AllUsersPage