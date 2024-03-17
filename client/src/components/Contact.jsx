import React, { useEffect, useState } from 'react'

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
            <p className='text-lg font-semibold mb-4'>Contact <span className='text-blue-600'>{landlord.username}</span> for <span className='text-green-600 italic'>'{listing.name}'</span></p>
            <textarea className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'name="message" id="message" rows="4" placeholder="Type your message here..." value={message} onChange={onChange}></textarea>
        </div>
    )}
    </>
  )
}
