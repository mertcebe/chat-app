import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../style/style.scss';
import PrivateRoute from '../components/PrivateRoute'
import PublicRoute from '../components/PublicRoute'
import ChatsPage from '../components/ChatsPage'
import SignInPage from '../components/SignInPage'
import useAuthorized from '../components/useAuthorized'
import { toast, ToastContainer } from 'react-toastify'
import AllUsersPage from '../components/AllUsersPage';
import FriendsRequests from '../components/FriendsRequests';


const AppRouter = () => {
    let { isAuthorized, loading } = useAuthorized();
    return (
        <>
            {
                loading ?
                    <h5>loading...</h5>
                    :
                    <>
                        <BrowserRouter>
                            <Routes>
                                <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
                                    <Route path='/chats' element={<ChatsPage />} />
                                    <Route path='/chats/all-users' element={<AllUsersPage />} />
                                </Route>
                                <Route element={<PublicRoute isAuthorized={isAuthorized} />}>
                                    <Route path='/' element={<SignInPage />} />
                                </Route>
                            </Routes>
                            <ToastContainer
                                position="bottom-center"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"
                            />
                        </BrowserRouter>
                    </>
            }
        </>
    )
}

export default AppRouter