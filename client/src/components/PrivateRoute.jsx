import React from 'react'
import {  useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)

    const isLoggedIn = currentUser !== null;

    if (isLoggedIn) {
        return <Outlet />;
    } 
    
    else {
        return <Navigate to='/sign-in' />;
    }
}