import React, { useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import pageNotFoundImage from '../../../public/images/219006-P0YPC6-16.svg'

export default function PageNotFound() {

    const Navigate = useNavigate();

    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when the component is unmounted
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="flex items-center text-center">
                <img src={pageNotFoundImage} alt="Oops Image" className="mx-auto mb-8" style={{ maxWidth: '350px' }} />
                <div className="ml-6">
                    <p className="text-2xl md:text-3xl font-semibold leading-normal">Sorry we couldn't find this page.</p>
                    <p className="text-lg mb-6 text-gray-600">But don't worry, you can find plenty of other things on our homepage.</p>
                    <button className="flex flex-col items-center justify-center p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-lg disabled:opacity-80 w-50% mx-auto" onClick={() => Navigate('/')}>Back to Home</button>
                </div>
            </div>
        </div>
    );
}
