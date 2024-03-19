import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
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
            <h2 className="text-gray-900 font-semibold text-lg">Explore</h2>
            <p className="text-gray-700 mt-2">Discover a wide range of properties tailored to your preferences.</p>
          </div>

          <div className="bg-white text-center shadow-lg p-6 rounded-lg">
            <h2 className="text-gray-900 font-semibold text-lg">Customize</h2>
            <p className="text-gray-700 mt-2">Personalize your search criteria to find the perfect fit for your lifestyle.</p>
          </div>

          <div className="bg-white text-center shadow-lg p-6 rounded-lg">
            <h2 className="text-gray-900 font-semibold text-lg">Connect</h2>
            <p className="text-gray-700 mt-2">Connect with reliable landlords and property managers effortlessly.</p>
          </div>
        </div>

        <Link to="/search" className="inline-block text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm sm:text-base">
          Let's Get Started
        </Link>
      </div>

      {/* swiper */}

      


      {/* listing results for offer, sale and rent */}
    </div>
  )
}
