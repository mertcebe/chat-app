import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import database, { auth } from '../firebase/firebaseConfig';
import { collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

// const FriendsRequests = () => {
//   return (
//     <div>FriendsRequests</div>
//   )
// }

export default function FriendsRequests() {
    let [users, setUsers] = useState();
    useEffect(() => {
        getDocs(query(collection(database, `chatUsers/${auth.currentUser.uid}/friendRequests`)))
            .then((snapshot) => {
                let users = [];
                snapshot.forEach((user) => {
                    users.push(user.data());
                })
                setUsers(users);
            })
    }, []);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const addFriend = (user) => {
        setDoc(doc(database, `chatUsers/${auth.currentUser.uid}/friends/${user.name}`), user)
            .then(() => {
                let { displayName, email, photoURL, uid } = auth.currentUser;
                setDoc(doc(database, `chatUsers/${user.uid}/friends/${displayName}`), {
                    name: displayName,
                    email: email,
                    photoURL: photoURL,
                    uid: uid
                });
                deleteDoc(doc(database, `chatUsers/${auth.currentUser.uid}/friendRequests/${user.uid}`))
                toast.success("Successfully add to my friends!");
            })
    }
    const handleClose = (user) => {
        if (user.uid !== undefined) {
            addFriend(user);
        }
        setAnchorEl(null)
    };

    const func = () => {
        toast.info('No any friend request!');
    }

    if (!users) {
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <div>
            <Button
                style={{ color: "#fff" }}
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={users.length > 0 ? handleClick : func}
            >
                <i class="fa-solid fa-user-plus"></i>
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {
                    users.map((user) => {
                        return (
                            <MenuItem onClick={() => {
                                handleClose(user);
                            }}>{user.name}</MenuItem>
                        )
                    })
                }
            </Menu>
        </div>
    );
}