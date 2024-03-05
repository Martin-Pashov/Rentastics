import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center mb-6 text-gray-800'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='username'/>
        <input type="email" placeholder='Email' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='email'/>
        <input type="password" placeholder='Password' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='password'/>
        <button disabled className='bg-blue-500 text-white p-3 rounded-lg uppercase cursor-not-allowed opacity-50'>Sign Up</button>
      </form>

      <div className='flex items-center mt-6'>
        <p className='mr-2 text-gray-600'>Have an account?</p>
        <Link to='/sign-in' className='text-blue-500'>
          Sign in
        </Link>
      </div>
    </div>
  );
}
