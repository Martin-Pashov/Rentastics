import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

export default function Listing() {
    const params = useParams();
    const Navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await response.json();

                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setListing(data);
                setLoading(false);
                setLoading(false);
            } 
            
            catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchListing();
    }, [params.listingId]);


  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && (
                <div className="text-center my-7">
                    <p className='text-2xl'>Oops! Something went wrong.</p>
                    <p className='text-xl text-gray-500'>Please try again later or return to the homepage.</p>
                    <button className="flex flex-col items-center justify-center p-3 mt-7 text-gray-700 border border-gray-700 rounded uppercase hover:shadow-lg disabled:opacity-80 w-50% mx-auto" onClick={() => Navigate('/')}>Return to Homepage</button>
                </div>
            )}

            {listing && !loading && !error && (
                <h1>{listing.name}</h1>
            )}
    </main>
  )
}
