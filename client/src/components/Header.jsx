import logo from '../../public/images/logo.svg'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    function pathMatchRoute(route) {
        if (route === location.pathname){
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');

        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }

    }, [location.search]);

  return (
    /* 'top-0 z-50' is subject to change due to stylistic reasons. What it does is stick the header to the top of the page so it stays put even if scrolling.*/
    <header className='bg-white border-b shadow-sm sticky top-0 z-50'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <img src={logo} alt='Martin Estate Logo' className='h-8 sm:h-10 cursor-pointer' />
            </Link>

            <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64 md:w-48' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button>
                    <FaSearch className='text-slate-600' />
                </button>
            </form>
            
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className={`py-6 text-md font-semibold text-gray-400 border-b- transparent hidden sm:inline ${pathMatchRoute('/') && 'text-black border-b-red-500'}`}>Home</li>
                </Link>

                <Link to='/search?offer=true'>
                    <li className={`py-6 text-md font-semibold text-gray-400 border-b-3 hidden sm:inline ${pathMatchRoute('/search?offer=true') && 'text-black border-b-red-500'}`}>Offers</li>
                </Link>

                <Link to='/about'>
                    <li className={`py-6 text-md font-semibold text-gray-400 border-b-3 hidden sm:inline ${pathMatchRoute('/about') && 'text-black border-b-red-500'}`}>About</li>
                </Link>

                <Link to='/profile'> 
                    {currentUser ? (
                        currentUser.avatar ? (
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="User Avatar" />
                        ) : (
                            <img className='rounded-full border border-slate-600 h-7 w-7 object-cover' src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" alt="Default Avatar" />
                        )
                    ) : (
                        <li className={`py-6 text-md font-semibold text-gray-400 border-b-3 hidden sm:inline ${pathMatchRoute('/sign-in') && 'text-black border-b-red-500'}`}>Sign In</li>
                    )}
                </Link>

            </ul>
        </div>
    </header>
  )
}
 