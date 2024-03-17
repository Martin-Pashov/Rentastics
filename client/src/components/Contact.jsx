import React, { useEffect, useState } from 'react'

export default function Contact({listing}) {
    const [ landlord, setLandlord ] = useState(null);

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
        <div className=''>
            <p>Contact <span>{landlord.username}</span></p>
        </div>
    )}
    </>
  )
}
