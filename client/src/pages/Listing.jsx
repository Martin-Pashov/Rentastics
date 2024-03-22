import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import powImage from '../../public/images/pow.svg';
import Contact from '../components/Contact';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Listing() {
    SwiperCore.use([Navigation]);

    const params = useParams();
    const Navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);

    const fetchGeolocation = async (address) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`);
            if (!response.ok) {
                throw new Error('Failed to fetch geolocation data');
            }
            const data = await response.json();
            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                return { lat, lng };
            }
            return null;
        } catch (error) {
            console.error('Error fetching geolocation:', error);
            return null;
        }
    };

    
    useEffect(() => {
        // Disable scrolling on mount if there's an error
        if (error) {
            document.body.style.overflow = 'hidden';
        }
    
        // Re-enable scrolling when the component is unmounted or when there's no error
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [error]);


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
            {loading && (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-center text-2xl">Loading...</p>
                </div>
            )}

            {error && (
                <div className="flex justify-center items-center h-screen">
                    <div className="flex items-center text-center">
                        <img src={powImage} alt="Oops Image" className="mx-auto mb-8" style={{ maxWidth: '300px' }} />
                        <div className="ml-6">
                            <p className="text-2xl md:text-3xl font-semibold leading-normal">Oops! It seems something went wrong.</p>
                            <p className="text-lg mb-6 text-gray-600">We couldn't find what you were looking for. Please try again later or return to the homepage.</p>
                            <button className="flex flex-col items-center justify-center p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-lg disabled:opacity-80 w-50% mx-auto" onClick={() => Navigate('/')}>Return to Homepage</button>
                        </div>
                    </div>
                </div>
            )}

            {listing && !loading && !error && (
                <div>
                    <Swiper navigation>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div className="absolute inset-0 bg-black opacity-20"></div>
                                <div className='h-[500px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                        <FaShare className='text-slate-500' onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 2000);
                        }}/>
                    </div>

                    {copied && (<p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>URL copied successfully.</p>)}

                    <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                        <p className='text-2xl font-semibold'>
                            {listing.name} - ${' '}
                            {listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                            {listing.type === 'rent' && ' / month'}
                        </p>

                        <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                            <FaMapMarkerAlt className='text-green-700' />
                            {listing.address}
                        </p>

                        <div className='flex gap-4'>
                            <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </p>

                            {listing.offer && (<p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>${+listing.regularPrice - +listing.discountedPrice} discount</p>)}
                        </div>

                        <p className='text-slate-800'>
                        <span className='font-semibold text-black text-lg'>Property Description:</span><br />
                            {listing.description.split('\n').map((paragraph, index) => (
                                <React.Fragment key={index}>
                                    {paragraph}<br className="mb-0" />
                                    {index < listing.description.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>

                        <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaBed className='text-lg' />
                                {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed `}
                            </li>


                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaBath className='text-lg' />
                                {listing.bathrooms > 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath `}
                            </li>

                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaParking className='text-lg' />
                                {listing.parking ? 'Parking spot' : 'No Parking'}
                            </li>

                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaChair className='text-lg' />
                                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                            </li>
                        </ul>
                        {currentUser && listing.userRef !== currentUser._id && !contact && (
                            <button onClick={() => setContact(true)} className='p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Get in Touch with Landlord</button>
                        )}
                        {contact && <Contact listing={listing} />}
                    </div>
                </div>
            )}

            {listing && (
                <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
                    <iframe
                        className="items-center"
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9158.702953449912!2d${encodeURIComponent(listing.address)}!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b15a735a589%3A0xfc5c6e0ee693079d!2sThe%20Peristyle!5e0!3m2!1sbg!2sbg!4v1711108895804!5m2!1sbg!2sbg`}
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Responsive Map"
                    ></iframe>
                </div>
            )}
        </main>
    );
}