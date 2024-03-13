import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            const response = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await response.json();

            if (data.success === false) {
                return;
            }

            setListing(data)
        }
    })

  return (
    <div>
      Lis
    </div>
  )
}
