import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">Welcome to Rentastics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="mb-8">
            <img src="../../public/images/about-us.svg" alt="About Us" className="rounded-lg shadow-md w-full object-cover hover:scale-105 transition-scale duration-300 filter brightness-90 hover:brightness-100"/>
          </div>
          <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">At Rentastics, we believe that finding the perfect rental shouldn't be stressful. We're here to simplify your search and provide you with expert guidance every step of the way.</p>
            <p className="text-lg text-gray-700 leading-relaxed">Our dedicated team understands that every renter has unique needs and preferences. Whether you're looking for a pet-friendly apartment, a furnished condo, or a family-friendly home in a good school district, we've got you covered.</p>
            <p className="text-lg text-gray-700 leading-relaxed">With Rentastics, you'll have access to a wide range of rental listings, detailed property information, and personalized recommendations based on your criteria. We're committed to helping you find a place you'll love to call home.</p>
            <p className="text-lg text-gray-700 leading-relaxed">Our mission is to make your rental journey as seamless and enjoyable as possible. Let us help you find the perfect rental that meets your needs and exceeds your expectations.</p>
            <Link to="/" className="inline-block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-sm sm:text-base w-full justify-stretch">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};