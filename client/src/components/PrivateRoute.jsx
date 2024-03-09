import React from 'react'
import {  useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)

    return currentUser ? (
        <Outlet />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-2xl mb-4">Oops! It seems like you're not signed in.</p>
            <p className="text-lg mb-6 text-gray-600">Sign in to view this page and explore exclusive features.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => <Navigate to="sign-in" />}>Sign In</button>
          </div>
        </div>
    );
}