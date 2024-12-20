import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/solid'

function Navbar() {
    return (
        <div className='relative text-white bg-red-600'>
            <div className='absolute top-0 right-3'>
                <Link className='font-bold text-sm' href='/'>Sign Up</Link>
                <span className='px-2'>|</span>
                <Link className='font-bold text-sm' href='/'>Sign In</Link>
            </div>
            <div className='flex items-center pt-3'>
                <Link href='/' className='flex items-center justify-center p-1'>
                    <Image src={'/logo.png'} width={60} height={60} alt='logo' />
                    <h2 className='ml-3 text-2xl font-bold'>ActiveX</h2>
                </Link>
                <div className='flex justify-around w-3/5'>
                    <Link className='font-bold font-xl' href='/'>Men</Link>
                    <Link className='font-bold font-xl' href='/'>Women</Link>
                    <Link className='font-bold font-xl' href='/'>Kids</Link>
                </div>
                <div className='flex justify-center w-1/4'>
                    <div className='relative'>
                        <input type='text' placeholder='Search' className='pl-8 py-1 rounded-3xl text-black' />
                        <MagnifyingGlassIcon className='absolute top-1/2 left-2 -translate-y-1/2 size-6 text-red-600' />
                    </div>
                    <div className='flex justify-around w-1/2'>
                        <Link href='/'>
                            <UserCircleIcon className='size-8' />
                        </Link>
                        <Link href='/'>
                            <ShoppingBagIcon className='size-8' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar