import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import logoImg from '../../public/images/faviconLogoFinal.svg';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        setError(null);
      }, 3000);
    }
    return () => clearTimeout(errorTimeout);
  }, [error]);


  useEffect(() => {
    let successTimeout;
    if (success) {
      successTimeout = setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    }
    return () => clearTimeout(successTimeout);
  }, [success, navigate]);


  useEffect(() => {
    let countdownInterval;
    if (success && redirectTimer > 0) {
      countdownInterval = setInterval(() => {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [success, redirectTimer]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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
      console.log(data);

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        setSuccess(false);
        return;
      }

      setLoading(false);
      setError(null);
      setSuccess(true);
    } 
    
    catch (error) {
      setLoading(false);
      setError(error.message);
      setSuccess(false);
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <div className='text-center'>
        <img className='mx-auto w-12' src={logoImg} alt="logo" />
        <h4 className='mb-12 mt-1 pb-1 text-xl font-bold'>Welcome to Rentastics</h4>
      </div>

      <h1 className='text-3xl text-center font-medium my-7'>Create Your Account Here</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
          <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
        <OAuth/>
      </form>

      <div className='flex justify-evenly mr-4 ml-4 mt-5'>
        <p>Already have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>

      {error && <p className='text-red-500 text-center mt-5'>{error}</p>}
      {success && <p className='text-green-500 text-center mt-5'>Sign up successful! Redirecting to sign in page in {redirectTimer} seconds...</p>}
      </div>
  );
}