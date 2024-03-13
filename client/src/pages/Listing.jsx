import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
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

                setListing(data)
            } 
            
            catch (error) {
                setError(true);
                setLoading(false);
            }
        }
    });


  return (
    <div>
      Lis
    </div>
  )
}
