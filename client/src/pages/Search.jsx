import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-8'>
            <div className='flex items-center gap-4'>
                <label className='whitespace-nowrap'>Search Term: </label>
                <input type='text' id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full'></input>
            </div>

            <div className='flex gap-3 flex-wrap items-center'>
                <label>Type:</label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='all' className='w-5'></input>
                    <span>Rent and Sale</span>
                </div>

                <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5'></input>
                    <span>Rent</span>
                </div>

                <div className='flex gap-2'>
                    <input type='checkbox' id='sale' className='w-5'></input>
                    <span>Sell</span>
                </div>

                <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5'></input>
                    <span>Offer</span>
                </div>
            </div>


            <div className='flex gap-3 flex-wrap items-center'>
                <label>Amenities:</label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5'></input>
                    <span>Parking lot</span>
                </div>

                <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5'></input>
                    <span>Furnished</span>
                </div>
            </div>
        </form>
      </div>


      <div className=''>
        <h1>Search Results:</h1>
      </div>
    </div>
  )
}
