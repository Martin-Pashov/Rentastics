import React, { useState } from 'react'

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });


    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebarData({ ...sidebarData, type: e.target.id });
        }

        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebarData({...sidebarData, 
                [e.target.id]: 
                e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
      
            setSidebarData({ ...sidebarData, sort, order });
        }
    };

    
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b border-gray-200 md:border-r md:min-h-screen'>
            <form className='flex flex-col gap-6'>
                <div className='flex items-center gap-4'>
                    <label htmlFor='searchTerm' className='whitespace-nowrap font-bold'>Search Term:</label>
                    <input type='text' id='searchTerm' placeholder='Enter keywords to search properties...' className='border rounded-lg p-3 w-full' value={sidebarData.searchTerm} onChange={handleChange}></input>
                </div>


                <div className='flex gap-3 flex-wrap items-center'>
                    <label className='font-semibold'>Property Type:</label>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='all' className='w-4 h-4' onChange={handleChange} checked={sidebarData.type === 'all'}></input>
                        <span>All Properties</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='rent' className='w-4 h-4' onChange={handleChange} checked={sidebarData.type === 'rent'}></input>
                        <span>For Rent</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='sale' className='w-4 h-4' onChange={handleChange} checked={sidebarData.type === 'sale'}></input>
                        <span>For Sale</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='offer' className='w-4 h-4' onChange={handleChange} checked={sidebarData.offer}></input>
                        <span>Special Offers</span>
                    </div>
                </div>


                <div className='flex gap-3 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='parking' className='w-4 h-4' onChange={handleChange} checked={sidebarData.parking}></input>
                        <span>Parking Available</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='furnished' className='w-4 h-4' onChange={handleChange} checked={sidebarData.furnished}></input>
                        <span>Furnished Properties</span>
                    </div>
                </div>


                <div className='flex items-center gap-3'>
                    <label className='font-semibold'>Sort By:</label>
                    <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3'>
                        <option value='regularPrice_desc'>Price: High to Low</option>
                        <option value='regularPrice_asc'>Price: Low to High</option>
                        <option value='createdAt_desc'>Latest Listings</option>
                        <option value='createdAt_asc'>Oldest Listings</option>
                    </select>
                </div>

                <button className='p-3 text-blue-500 border border-blue-500 rounded uppercase hover:shadow-lg disabled:opacity-80 font-medium'>Search Properties</button>
            </form>
        </div>

        <div className='w-full text-center'>
            <h1 className='text-3xl font-semibold border-b p-3 mt-5'>Search Results</h1> {/*TODO// Search Results: Found {num of properties} properties matching your criteria*/}
        </div>
    </div>
)}
