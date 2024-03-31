import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
    
        if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);

            const searchQuery = urlParams.toString();
            const response = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await response.json();

            if (data.length > 8) {
                setShowMore(true);
            } 
            
            else {
                setShowMore(false);
            }

            setListings(data);
            setLoading(false);
        };
      
        fetchListings();
    }, [location.search]);



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



    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();

        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };


    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);

        urlParams.set('startIndex', startIndex);

        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();

        if (data.length < 9) {
            setShowMore(false);
        }

        setListings([...listings, ...data]);
    };



    return (
        <div className='flex flex-col md:flex-row h-full'>
          <div className='p-10 border-gray-200 md:border-r md:min-h-screen md:flex-grow'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 h-full'>
                <div className='flex items-center gap-4'>
                    <label htmlFor='searchTerm' className='whitespace-nowrap font-bold'>Search Term:</label>
                    <input type='text' id='searchTerm' placeholder='Enter keywords to search properties...' className='truncate border rounded-lg p-3 w-full' value={sidebarData.searchTerm} onChange={handleChange}></input>
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

                <button className='p-3 text-blue-500 border border-blue-500 rounded uppercase hover:shadow-lg disabled:opacity-80 font-bold'>Search Properties</button>
            </form>
        </div>


        <div className='w-full text-center'>
            <h1 className='text-3xl font-semibold border-b p-3 mt-5'>Search Results</h1> {/*TODO// Search Results: Found {num of properties} properties matching your criteria*/}
            <div className='p-7 flex flex-wrap gap-4 justify-center'>
                {!loading && listings.length === 0 && (
                    <p className='text-xl text-center text-gray-600'>No listings found. Please try refining your search criteria.</p>
                )}

                {loading && (
                    <p className='text-xl text-center text-gray-600 w-full'>Loading...</p>
                )}

                {!loading && listings && listings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing}/>
                ))}
            </div>

            {showMore && (
                <button onClick={onShowMoreClick} className='bg-green-500 hover:bg-green-600 mb-7 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out max-w-xs'>Load More Properties</button>
            )}
        </div>
    </div>
)}
