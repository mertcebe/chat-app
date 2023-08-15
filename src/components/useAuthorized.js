import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const useAuthorized = () => {
    let [isAuthorized, setIsAuthorized] = useState();
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthorized(true);
            }
            else {
                setIsAuthorized(false);
            }
            setLoading(false);
        });
    }, []);
    return { isAuthorized, loading }
}

export default useAuthorized