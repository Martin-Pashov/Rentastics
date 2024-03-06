import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(3); // Initial countdown value
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
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
      const res = await fetch('/api/auth/signin', {
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
        setIsLoggedIn(true);
      } 
      
      else {
        setError(data.message);
        setSuccessMessage(null);
        setLoading(false);
      }
      
    } catch (error) {
      setError('An error occurred during sign-in.');
      setSuccessMessage(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;

    if (successMessage) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);

        if (countdown === 0) {
          clearInterval(timer);
          setSuccessMessage(null);
          navigate('/');
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [successMessage, countdown, navigate]);


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center mb-6 text-gray-800'>Sign In</h1>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border rounded-lg p-3 focus:outline-none focus:border-blue-500' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>

      {!isLoggedIn && (
        <div className='flex items-center mt-6'>
          <p className='mr-2 text-gray-600'>Do not have an account?</p>
          <Link to='/sign-up' className='text-blue-500'>
            Sign up
          </Link>
        </div>
      )}

      {error && (
        <div className='text-red-500 mt-10 flex flex-col items-center'>
          <p>{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className='flex flex-col items-center'>
          <p className='text-green-500 mt-5'>{successMessage}</p>
          <p className='text-blue-500 mt-2'>{`Redirecting to the home page in ${countdown} seconds...`}</p>
        </div>
      )}
    </div>
  );
}