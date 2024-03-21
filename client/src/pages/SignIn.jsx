import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import logoImg from '../../public/images/faviconLogoFinal.svg';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);


      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } 
    
    catch (error) {
      dispatch(signInFailure(error.message));
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <div className='text-center'>
        <img className='mx-auto w-12' src={logoImg} alt="logo" />
        <h4 className='mb-12 mt-1 pb-1 text-xl font-bold'>Welcome to Rentastics</h4>
      </div>
  
      <h1 className="my-7 text-center text-3xl font-medium">Please Log In to Your Account</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth />
  
        <Link to="/forgot-password" className="block text-center mt-2 text-blue-500">
          Forgot Password?
        </Link>        
      </form>
  
      <div className="mt-6 mr-4 ml-4 text-center flex justify-between">
        <p className="text-gray-600">Don't have an account?</p>
        <Link to="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </div>
  
      {error && 
        <p className='text-red-500 text-center mt-5'>{error}</p>
      }
    </div>
  );
}
  