import React from 'react'
import oopsImage from '../../../public/images/oops.svg'
import { Navigate, useNavigate } from 'react-router-dom'

export default function AccessDeniedPage() {

    const Navigate = useNavigate();


  return (
    <div className="flex justify-center items-center h-screen ">
        <div className="flex items-center text-center">
            <img src={oopsImage} alt="Oops Image" className="mx-auto mb-8" style={{ maxWidth: '300px' }} />
            <div className="ml-6">
                <p className="text-3xl mb-4">Oops! It seems like you're not signed in.</p>
                <p className="text-lg mb-6 text-gray-600">Sign in to view this page and explore exclusive features.</p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700" onClick={() => Navigate('/sign-in')}>Sign In</button>
            </div>
        </div>
    </div>
  )
}
