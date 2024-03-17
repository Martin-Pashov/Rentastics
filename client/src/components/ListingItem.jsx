import React from 'react'
import { Link } from 'react-router-dom';

export default function ListingItem({ listing }) {
  return (
    <div>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0] || 'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_640.jpg'} alt='listing cover' className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
        </Link>
    </div>
  )
}
