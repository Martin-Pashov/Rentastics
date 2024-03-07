import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';

export default function OAuth() {
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })

            const data = await res.json()
            

            
            
            
            
            const isAuthenticated = res.status === 200;

            if (isAuthenticated) {
                // Perform actions after successful authentication, such as redirecting or updating state
                console.log('Successfully signed in with Google');
            } 
            
            else {
                // Handle the case where authentication was not successful
                console.error('Authentication with Google failed');
            }
        } 
        
        catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a status code other than 2xx
                console.error('Google authentication failed. Server responded with:', error.response.status, error.response.data);
            } 
            
            else if (error.request) {
                // The request was made but no response was received
                console.error('Google authentication failed. No response received from the server');
            } 
            
            else {
                // Something happened in setting up the request that triggered an Error
                console.error('An unexpected error occurred during Google authentication:', error.message);
            }
        }
    };

    return (
        <button onClick={handleGoogleClick} type="button" className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95">Continue with Google</button>
    );
}
