import logo from '../../public/images/logo.svg'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-white border-b shadow-sm sticky'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <img src={logo} alt='Martin Estate Logo' className='h-8 sm:h-10 cursor-pointer' />
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64 md:w-48' />
                <FaSearch className='text-black' />
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline'>Home</li>
                </Link>

                <Link to='/offers'>
                <li className='hidden sm:inline'>Offers</li>
                </Link>

                <Link to='/about'>
                <li className='hidden sm:inline'>About</li>
                </Link>

                <Link to='/sign-in'>
                <li>Sign In</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
 