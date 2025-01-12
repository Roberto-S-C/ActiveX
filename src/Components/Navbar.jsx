import React from 'react'
import { MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import logo from '../assets/logo.png'
import { Link, Outlet } from 'react-router'

function Navbar() {
    return (
        <div>
            <div className='relative text-white bg-red-600'>
                <div className='absolute top-0 right-3'>
                    <Link className='font-bold text-sm' to='/signup'>Sign Up</Link>
                    <span className='px-2'>|</span>
                    <Link className='font-bold text-sm' to='/signin'>Sign In</Link>
                </div>
                <div className='flex items-center pt-3'>
                    <a href='/' className='flex items-center justify-center p-1'>
                        <img src={logo} width={60} height={60} alt='logo' />
                        <h2 className='ml-3 text-2xl font-bold'>ActiveX</h2>
                    </a>
                    <div className='flex justify-around w-3/5'>
                        <a className='font-bold font-xl' href='/'>Men</a>
                        <a className='font-bold font-xl' href='/'>Women</a>
                        <a className='font-bold font-xl' href='/'>Kids</a>
                    </div>
                    <div className='flex justify-center w-1/4'>
                        <div className='relative'>
                            <input type='text' placeholder='Search' className='pl-8 py-1 rounded-3xl text-black' />
                            <MagnifyingGlassIcon className='absolute top-1/2 left-2 -translate-y-1/2 size-6 text-red-600' />
                        </div>
                        <div className='flex justify-around w-1/2'>
                            <a href='/'>
                                <UserCircleIcon className='size-8' />
                            </a>
                            <a href='/'>
                                <ShoppingBagIcon className='size-8' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default Navbar