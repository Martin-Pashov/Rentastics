import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', formData);
  }

  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center mb-6 text-gray-800'>Sign Up</h1>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='username' onChange={handleChange}/>
        <input type="email" placeholder='Email' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='password' onChange={handleChange}/>
        <button className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
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
