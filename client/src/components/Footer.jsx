import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import logo from '../../public/images/logo.svg';

export default function Footer() {
  return (
    <footer className='bg-white border-t-8 border-red-400 mt-44'>
      <div className='container mx-auto py-12'>
        <div className='grid mb-10'>
          <div className='flex items-center justify-center md:justify-center'>
            <Link to='/' className='flex items-center space-x-2'>
              <img src={logo} alt="Rentastics" className="h-12 sm:h-16 center" />
            </Link>
          </div>
        </div>

        <div className='grid-flow-col flex justify-evenly grid-cols-1 -mx-4'>
            <div className="px-4">
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul>
              <li>
                <Link to='/search?searchTerm=&type=all&parking=false&furnished=false&offer=false&sort=created_at&order=desc' className='text-gray-700 hover:text-gray-900'>View Properties</Link>
              </li>
              <li>
                <Link to='/search?offer=true' className='text-gray-700 hover:text-gray-900'>Available Offers</Link>
              </li>
            </ul>
          </div>

          <div className="px-4">
            <h3 className="font-bold text-lg mb-4">Follow us</h3>
            <ul>
              <li>
                <a href='https://www.github.com/Martin-Pashov' target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-gray-900'>Github</a>
              </li>
              <li>
                <Link to='/about' className='text-gray-700 hover:text-gray-900'>About Us</Link>
              </li>
            </ul>
          </div>

          <div className="px-4">
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul>
              <li>
                <a href='#' className='text-gray-700 hover:text-gray-900'>Privacy Policy</a>
              </li>
              <li>
                <a href='#' className='text-gray-700 hover:text-gray-900'>Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-t-2 border-gray-300" />
        <div className='flex justify-center items-center space-x-6'>
          <p className="text-gray-600">© {new Date().getFullYear()} Rentastics Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href='#' className='text-gray-600'><BsFacebook /></a>
            <a href='#' className='text-gray-600'><BsInstagram /></a>
            <a href='#' className='text-gray-600'><BsTwitter /></a>
            <a href='https://github.com/Martin-Pashov' className='text-gray-600'><BsGithub /></a>
            <a href='#' className='text-gray-600'><BsDribbble /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
