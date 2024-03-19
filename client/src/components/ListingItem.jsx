import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function ListingItem({ listing }) {
  return (
      <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] flex flex-col'>
        <Link to={`/listing/${listing._id}`} className="block flex-grow">
          <img
            src={listing.imageUrls[0] || 'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_640.jpg'}
            alt='listing cover'
            className='h-[220px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 filter brightness-90 hover:brightness-100'
            />

          <div className='p-4'>
            <h2 className="text-lg font-semibold text-gray-900">Title:</h2>
            <p className='truncate text-md text-gray-900'>{listing.name}</p>
            
            <div className='flex items-center mt-2 text-gray-600 text-sm'>
              <MdLocationOn className=' text-red-700 h-5 w-5 mr-2' />
              <p className='truncate'>{listing.address}</p>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Description:</h3>
            <p className='text-sm text-gray-700 mt-2 line-clamp-3'>{listing.description}</p>
          </div>
        </Link>

        <div className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Price:</h4>
            <p className='text-sm font-semibold text-gray-700'>
              ${listing.offer ? listing.discountedPrice?.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Bedrooms:</h4>
            <p className='text-sm font-semibold text-gray-700'>{listing.bedrooms}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Bathrooms:</h4>
            <p className='text-sm font-semibold text-gray-700'>{listing.bathrooms}</p>
          </div>
        </div>
    </div>
  )
}