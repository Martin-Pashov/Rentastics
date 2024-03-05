import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setError(null);
        setLoading(false);
      } 
      
      else {
        setError(data.message);
        setSuccessMessage(null);
        setLoading(false);
      }
      
    } catch (error) {
      setError('An error occurred during signup.');
      setSuccessMessage(null);
      setLoading(false);
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center mb-6 text-gray-800'>Sign Up</h1>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='username' onChange={handleChange}/>
        <input type="email" placeholder='Email' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
      </form>

      <div className='flex items-center mt-6'>
        <p className='mr-2 text-gray-600'>Have an account?</p>
        <Link to='/sign-in' className='text-blue-500'>
          Sign in
        </Link>
      </div>
      {error && (
        <div className='text-red-500 mt-10 flex flex-col items-center'>
          <p>{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className='flex flex-col items-center'>
          <p className='text-green-500 mt-5'>{successMessage}</p>
          <p className='mt-2 text-blue-500 cursor-pointer' onClick={() => navigate('/sign-in')}>Click here to Sign In</p>
        </div>
      )}
    </div>
  );
}