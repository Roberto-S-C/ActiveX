import React, { useEffect, useState } from 'react'
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import logo from '../assets/logo.png'
import { Link, Outlet } from 'react-router'
import Filtering from './Filtering'

function Navbar() {
    return (
        <div>
            <div className='relative text-white bg-red-600 px-2 py-5'>
                <div className='absolute top-0 right-3'>
                    <Link className='font-bold text-sm' to='/signup'>Sign Up</Link>
                    <span className='font-bold text-sm mx-2'>|</span>
                    <Link className='font-bold text-sm' to='/signin'>Sign In</Link>
                </div>

                <div className='flex items-center'>
                    <div className='flex justify-start w-1/6'>
                        <a href='/products' className='flex items-center justify-center'>
                            <img src={logo} width={60} height={60} alt='logo' className='mr-2' />
                            <h2 className='text-4xl font-bold hover:text-slate-200'>ActiveX</h2>
                        </a>
                    </div>

                    <div className='flex justify-center items-center w-2/3'>
                        <Filtering />
                    </div>

                    <div className='flex justify-center w-1/6'>
                        <div className='flex justify-around w-full'>
                            <Link to='/account'>
                                <UserCircleIcon className='size-10 hover:text-slate-200' />
                            </Link>
                            <Link to='/shoppingbag'>
                                <ShoppingBagIcon className='size-10 hover:text-slate-200' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Navbar