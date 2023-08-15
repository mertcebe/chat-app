import React from 'react'
import {Outlet, Navigate} from 'react-router'

const PrivateRoute = ({isAuthorized}) => {
    return (
        <>
            {
                isAuthorized?
                <Outlet />
                :
                <Navigate to={`/`}/>
            }
        </>
    )
}

export default PrivateRoute