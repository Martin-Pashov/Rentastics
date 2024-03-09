import logo from '../../public/images/logo.svg'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
    const location = useLocation();
    function pathMatchRoute(route) {
        if (route === location.pathname){
            return true;
        }
    }

  return (
    /* 'top-0 z-50' is subject to change due to stylistic reasons. What it does is stick the header to the top of the page so it stays put even if scrolling.*/
    <header className='bg-white border-b shadow-sm sticky top-0 z-50'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <img src={logo} alt='Martin Estate Logo' className='h-8 sm:h-10 cursor-pointer' />
            </Link>

            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64 md:w-48' />
                <FaSearch className='text-black' />
            </form>
            
            <ul className='flex gap-4'>

                {/*
                intellisense says ''border-b-transparent' applies the same CSS properties as 'border-b-[3]'', when it clearly doesn't?, 
                also the '${pathMatchRoute('/') && 'text-black border-b-red-500'}' part is executed but not visualized in localhost, 
                reason - border bottom remains 0, even after tailwind styling is applied
                */}
                <Link to='/'>
                <li className={`py-6 text-md font-semibold text-gray-400 border-b-[3] border-b-transparent hidden sm:inline ${pathMatchRoute('/') && 'text-black border-b-red-500'}`}>Home</li>
                </Link>

                <Link to='/offers'>
                <li className={`text-md font-semibold text-gray-400 border-b-[3] border-b-transparent hidden sm:inline ${pathMatchRoute('/offers') && 'text-black border-b-red-500'}`}>Offers</li>
                </Link>

                {/* This is subject to change due to stylistic reasons. The location may be changed and removed from the header component.*/}
                <Link to='/about'>
                <li className={`text-md font-semibold text-gray-400 border-b-[3] border-b-transparent hidden sm:inline ${pathMatchRoute('/about') && 'text-black border-b-red-500'}`}>About</li>
                </Link>

                <Link to='/profile'> 
                    {
                        currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="" />
                        ): <li className={`text-md font-semibold text-gray-400 border-b-[3] border-b-transparent ${pathMatchRoute('/sign-in') && 'text-black border-b-red-500'}`}>Sign In</li>
                    }
                </Link>
            </ul>
        </div>
    </header>
  )
}
 