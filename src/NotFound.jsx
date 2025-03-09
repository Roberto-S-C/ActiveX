import React from 'react'
import Header from './Components/Header'
import { FaceFrownIcon } from '@heroicons/react/24/solid'

function NotFound() {
  return (
    <div>
        <Header title={'Page Not Found'} />
        <div className='flex flex-col justify-center items-center gap-3 h-screen'>
            <FaceFrownIcon className='size-40 text-slate-400' />
            <h2 className='text-4xl font-bold text-slate-600'>404</h2>
            <h2 className='text-2xl text-red-600'>Oops! Page Not Found...</h2>
        </div>
    </div>
  )
}

export default NotFound