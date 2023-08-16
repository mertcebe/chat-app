import React, { useEffect, useState } from 'react'
import ChatsPage from './ChatsPage'
import database, { auth } from '../firebase/firebaseConfig'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import User from './User'

const AllUsersPage = () => {
    let [users, setUsers] = useState();
    useEffect(() => {
        getDocs(query(collection(database, `chatUsers`) , where('email', '!=', auth.currentUser.email)))
            .then((snapshot) => {
                let users = [];
                snapshot.forEach((user) => {
                    users.push(user.data());
                })
                setUsers(users);
            })
    }, []);
    if(!users){
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <div className='d-flex align-items-start' style={{flexWrap: "wrap"}}>
            {
                users.map((user, index) => {
                    return <User key={index} user={user}/>
                })
            }
        </div>
    )
}

export default AllUsersPage