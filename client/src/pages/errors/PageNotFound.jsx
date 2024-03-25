import React, { useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import pageNotFoundImage from '../../../public/images/pageNotFound.svg'

export default function PageNotFound() {

    const Navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen">
          <div className="py-20 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center font-bold mb-20 text-gray-800">Apologies, we couldn't find what you are looking for.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="mb-8">
                <img src={pageNotFoundImage} alt="Page Not Found" className="rounded-lg shadow-md w-full object-cover hover:scale-105 transition-scale duration-300 filter brightness-90 hover:brightness-100"/>
              </div>
              <div className="space-y-7 flex-col justify-center">
                <p className="text-lg text-gray-700 text-center leading-relaxed">But don't worry, there's a whole array of exciting content waiting for you on our homepage. Let us guide you through the diverse range of listings, services, and resources tailored to your needs.</p>
                <p className="text-lg text-gray-700 text-center leading-relaxed">Feel free to immerse yourself in the wealth of options available. Explore our comprehensive listings, delve into insightful guides, and uncover valuable tips to enhance your rental journey. Your perfect rental home is just a click away!</p>
                <button className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg text-sm sm:text-base w-full justify-stretch focus:outline-none" onClick={() => Navigate('/')}>
                  Back to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
    );  
}
