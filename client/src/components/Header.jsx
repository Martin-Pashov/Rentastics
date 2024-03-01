import React from 'react'
import logo from '../../public/images/logo.svg';

export default function Header() {
  return (
    <header className='bg-white border-b shadow-sm sticky'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <img src={logo} alt='Martin Estate Logo' className='h-8 sm:h-10 cursor-pointer' />
            <form className='bg-slate-100 p-3 rounded-lg'>
                <input type='text' placeholder='Search...' className='bg-transparent'/>
            </form>
        </div>
    </header>
  )
}
