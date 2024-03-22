import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(saleListings);
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const response = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await response.json();

        setOfferListings(data);
        fetchRentListings();
      } 
      
      catch (error) {
        console.log(error);
      }
    };


    const fetchRentListings = async () => {
      try {
        const response = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await response.json();

        setRentListings(data);
        fetchSaleListings();
      } 
      
      catch (error) {
        console.log(error);
      }
    };


    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } 
      
      catch (error) {
        log(error);
      }
    };

    fetchOfferListings();
  }, []);
  

  return (
    <div>
      {/* Top */}
      <div className="flex flex-col gap-8 p-8 md:p-16 lg:p-24 max-w-5xl mx-auto">
        <h1 className="text-gray-900 font-bold text-3xl md:text-5xl lg:text-6xl">
          Find Your Next <span className="text-blue-500">Perfect</span> Place with Ease
        </h1>

        <p className="text-gray-700 text-base md:text-lg lg:text-xl">
          Welcome to Rentastics, where your dream home awaits. With our curated selection of properties, finding the perfect place has never been easier.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3">
          <div className="bg-white text-center shadow-lg p-6 rounded-lg">
            <h2 className="text-gray-900 font-semibold text-xl">Explore</h2>
            <p className="text-gray-700 mt-2">Discover a wide range of properties tailored to your preferences.</p>
          </div>

          <div className="bg-white text-center shadow-lg p-6 rounded-lg">
            <h2 className="text-gray-900 font-semibold text-xl">Customize</h2>
            <p className="text-gray-700 mt-2">Personalize your search criteria to find the perfect fit for your lifestyle.</p>
          </div>

          <div className="bg-white text-center shadow-lg p-6 rounded-lg">
            <h2 className="text-gray-900 font-semibold text-xl">Connect</h2>
            <p className="text-gray-700 mt-2">Connect with reliable landlords and property managers effortlessly..</p>
          </div>
        </div>

        <Link to="/search" className="inline-block text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm sm:text-base">
          Get Started Now
        </Link>
      </div>


      {/* swiper */}
      <Swiper
        navigation
        spaceBetween={50}
        slidesPerView={1}
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="relative h-96 md:h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${listing.imageUrls[0]})`,
                }}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h2 className="font-bold text-xl md:text-4xl text-center mb-4 opacity-70">
                    {listing.name}
                  </h2>
                  <a href={`/listing/${listing._id}`} className="text-white opacity-65 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 ease-in-out">Discover More</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>


      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto px-4 py-8 flex flex-col gap-12 my-10 items-center'>
        {offerListings && offerListings.length > 0 && (
          <div className='border border-gray-200 rounded-lg overflow-hidden justify-center w-full'>
            <div className='p-4 bg-gray-100 text-center'>
              <h2 className='text-xl font-bold text-gray-800'>Explore Our Latest Property Offers</h2>
              <p className="text-sm text-gray-600 mt-1">Discover our newest property listings and find your dream home.</p>
              <Link className='text-sm text-blue-700 hover:text-blue-900 hover:underline mt-4' to={'/search?offer=true'}>Browse All Offers 
                <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </Link>
            </div>
            <div className='flex flex-wrap text-center gap-4 p-4 justify-center'>
              {offerListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className='border border-gray-200 rounded-lg overflow-hidden w-full'>
            <div className='p-4 bg-gray-100 text-center'>
              <h2 className='text-xl font-bold text-gray-800'>Find Your Perfect Rental Property</h2>
              <p className="text-sm text-gray-600 mt-1">Browse through our latest rental listings to secure your next home.</p>
              <Link className='text-sm text-blue-700 hover:text-blue-900 hover:underline mt-4' to={'/search?type=rent'}>Explore Rental Places 
                <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </Link>
            </div>
            <div className='flex flex-wrap text-center gap-4 p-4 justify-center'>
              {rentListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
            
        {saleListings && saleListings.length > 0 && (
          <div className='border border-gray-200 rounded-lg overflow-hidden w-full'>
            <div className='p-4 bg-gray-100 text-center'>
              <h2 className='text-xl font-bold text-gray-800'>Discover Exclusive Properties for Sale</h2>
              <p className="text-sm text-gray-600 mt-1">Explore our collection of exclusive properties for sale, carefully curated for you.</p>
              <Link className='text-sm text-blue-700 hover:text-blue-900 hover:underline mt-4' to={'/search?type=sale'}>View All Properties for Sale 
                <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </Link>
            </div>
            <div className='flex flex-wrap text-center w-full gap-5 p-4 justify-center'>
              {saleListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
