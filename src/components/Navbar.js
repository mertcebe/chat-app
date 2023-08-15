import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import database, { auth } from '../firebase/firebaseConfig'
import { collection, doc, endAt, getDoc, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
]
const Navbar = () => {
    let [users, setUsers] = useState();
    const findUser = (text) => {
        // getDocs(query(collection(database, `chatUsers`), orderBy("name", 'asc'), startAt(text), limit(2)))
        //     .then((snapshot) => {
        //         let users = [];
        //         snapshot.forEach((user) => {
        //             users.push(user);
        //             if (user.exists()) {
        //                 console.log(user.data());
        //             }
        //         })
        //     })
    }

    useEffect(() => {
        getDocs(query(collection(database, `chatUsers`)))
            .then((snapshot) => {
                let users = [];
                snapshot.forEach((user) => {
                    users.push(user.data());
                })
                setUsers(users);
                console.log(users)
            })
    }, []);
    if(!users){
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <div className='d-flex justify-content-between' style={{ height: "calc(100vh - 40px)", background: "#324f6a", flexDirection: "column", width: "20%" }}>
            <div>
                <input type="text" placeholder='Find a user' onChange={(e) => {
                    if (e.target.value != '') {
                        findUser(e.target.value);
                    }
                }} style={{ background: "transparent", width: "100%", height: "40px", color: "#fff", border: "none", outline: "none" }} />
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={users.map((option) => option.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <hr className='my-0' />
                <ul>
                    {/* the people who text */}
                </ul>
            </div>
            <button className='btn btn-sm' onClick={() => {
                signOut(auth);
            }} style={{ width: "70px", border: "none", backgroundColor: "#42698d", padding: "0 10px", margin: "10px", color: "#fff" }}>logout</button>
        </div>
    )
}

export default Navbar