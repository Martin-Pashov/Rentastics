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
import "leaflet/dist/leaflet.css";
import { getCoordinatesForListing } from '../../../api/controllers/listing.controller.js';

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
    const [mapCenter, setMapCenter] = useState([48.8566, 2.3522]); // Default center

    
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


    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                if (listing && listing.address) {
                    const coords = await getCoordinatesForListing(listing);
                    if (coords) {
                        setMapCenter([coords.lat, coords.lng]);
                    } 
                    
                    else {
                        console.log('Coordinates not found for the listing.');
                    }
                }
            } 
            
            catch (error) {
                console.error('Error fetching coordinates:', error);
            }
        };
    
        fetchCoordinates();
    }, [listing]);
    

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
                                <div className='h-[550px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className='fixed top-[12%] right-[5%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                        <FaShare className='text-slate-500' onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 2000);
                        }}/>
                    </div>

                    {copied && (<p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>URL copied successfully.</p>)}

                    <div className='m-4 flex flex-col md:flex-auto max-w-6xl lg:mx-auto p-3 my-7 ml-5 mr-5 gap-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
                        <div className='flex justify-evenly flex-col-reverse md:flex-row-reverse md:gap-4'>
                            <div className='md:w-5/12 h-72 md:h-auto z-10 overflow-x-hidden my-4 md:my-32'>
                                <MapContainer
                                    center={mapCenter}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                    className="w-full h-full"
                                    style={{ minHeight: '200px' }}
                                >
                                    {/* Render the tile layer */}
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {/* Render the marker if the coordinates are available */}
                                    {mapCenter && (
                                        <Marker position={mapCenter}>
                                            <Popup>The address of the property is: {listing.address}</Popup>
                                        </Marker>
                                    )}
                                </MapContainer>
                            </div>

                            <div className='flex flex-col md:w-5/12'>
                                <div className='flex flex-col justify-between max-w-4xl mx-auto p-3 my-7 gap-4'>
                                    <p className='text-3xl font-semibold'>
                                        {listing.name} <br/>${' '}
                                        {listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                                        {listing.type === 'rent' && ' per month'}
                                    </p>

                                    <p className='flex items-center mt-4 gap-2 text-slate-600 text-md'>
                                        <FaMapMarkerAlt className='text-green-700' />
                                        {listing.address}
                                    </p>
                                    
                                    <div className='w-full flex gap-4 justify-center'>
                                        <p className='bg-red-900 w-full max-w-[615px] text-white text-center p-2 rounded-md flex justify-center items-center'>
                                            {listing.type === 'rent' ? 'Available for Rent' : 'Available for Sale'}
                                        </p>
                                    </div>

                                    <div className='flex gap-4 justify-center'>
                                        {listing.offer && (
                                            <p className='bg-green-900 w-full max-w-[300px] text-white text-center p-1.5 rounded-md flex justify-center items-center'>
                                                {`A discount of $${(+listing.regularPrice - +listing.discountedPrice).toLocaleString('en-US')} is applied`}
                                            </p>
                                        )}
                                        {listing.offer && (
                                            <p className='bg-green-900 w-full max-w-[300px] text-white text-center p-1.5 rounded-md flex justify-center items-center'>
                                                {`Original price is $${listing.regularPrice.toLocaleString('en-US')}`}
                                            </p>
                                        )}
                                    </div>



                                    <div className='text-slate-800 items-stretch'>
                                        <p className='font-semibold mb-2 mt-5 text-black text-xl'>Overview of the Property:</p>
                                        {listing.description.split('\n').map((paragraph, index) => (
                                            <React.Fragment key={index}>
                                                <span className='justify-evenly'>{paragraph}</span>
                                                {index < listing.description.split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </div>


                                    <ul className='text-green-800 font-semibold text-sm flex flex-wrap justify-evenly items-center gap-4 sm:gap-6'>
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
                                        <button onClick={() => setContact(true)} className='p-3 text-blue-900 border border-blue-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Get in Touch with Landlord</button>
                                    )}
                                    {contact && <Contact listing={listing} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}