import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [ landlord, setLandlord ] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const response = await fetch(`/api/user/${listing.userRef}`);
                const data = await response.json();

                setLandlord(data);
            } 
            
            catch (error) {
                console.log(error);
            }
        }

        fetchLandlord();

    }, [listing.userRed]);


  return (
    <>
    {landlord && (
        <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
            <p className='text-lg font-semibold mb-4 text-center'>Contact landlord at <span className='text-blue-600'>{landlord.username}</span> regarding: <span className='text-green-600'>'{listing.name}'</span></p>
            <textarea className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' name="message" id="message" rows="4" placeholder="Type your message here..." value={message} onChange={onChange}></textarea>
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className="max-w-4xl mx-auto mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center justify-center">Send the Message to the Landlord</Link>
        </div>
    )}
    </>
  )
}
