import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
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
      const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in');
      }

    catch {
      setLoading(false);
      setError(data.message);
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
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
