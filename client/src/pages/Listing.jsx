import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import powImage from '../../public/images/pow.svg';

export default function Listing() {
    SwiperCore.use([Navigation]);

    const params = useParams();
    const Navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
                                <div className='h-[500px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </main>
    )
}
