import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
    <div className='p-7 border-b border-gray-200 md:border-r md:min-h-screen'>
      <form className='flex flex-col gap-6'>
        <div className='flex items-center gap-4'>
          <label htmlFor='searchTerm' className='whitespace-nowrap font-bold'>Search Term:</label>
          <input type='text' id='searchTerm' placeholder='Enter keywords to search properties...' className='border rounded-lg p-3 w-full'></input>
        </div>

        <div className='flex gap-3 flex-wrap items-center'>
          <label className='font-semibold'>Property Type:</label>
          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='all' className='w-4 h-4'></input>
            <span>All Properties</span>
          </div>

          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='rent' className='w-4 h-4'></input>
            <span>For Rent</span>
          </div>

          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='sale' className='w-4 h-4'></input>
            <span>For Sale</span>
          </div>

          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='offer' className='w-4 h-4'></input>
            <span>Special Offers</span>
          </div>
        </div>

        <div className='flex gap-3 flex-wrap items-center'>
          <label className='font-semibold'>Amenities:</label>
          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='parking' className='w-4 h-4'></input>
            <span>Parking Available</span>
          </div>

          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='furnished' className='w-4 h-4'></input>
            <span>Furnished Properties</span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <label htmlFor='sort_order' className='font-semibold'>Sort By:</label>
          <select id='sort_order' className='border rounded-lg p-3'>
            <option>Price: High to Low</option>
            <option>Price: Low to High</option>
            <option>Latest Listings</option>
            <option>Oldest Listings</option>
          </select>
        </div>

        <button className='p-3 text-blue-500 border border-blue-500 rounded uppercase hover:shadow-lg disabled:opacity-80 font-medium'>Search Properties</button>
      </form>
    </div>

    <div className='w-full text-center'>
      <h1 className='text-3xl font-semibold border-b p-3 mt-5'>Search Results</h1> {/*TODO// Search Results: Found {num of properties} properties matching your criteria*/}
    </div>
  </div>
  )
}
