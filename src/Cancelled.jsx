import { FaceFrownIcon } from '@heroicons/react/24/solid'
import React from 'react'

function Cancelled() {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <FaceFrownIcon className='w-3/5 md:w-2/5 lg:w-1/3 text-red-600' />
            <h2 className='p-2 font-bold text-xl md:text-2xl lg:text-4xl text-center text-slate-400'>Your order couldn't be completed. Try again.</h2>
        </div>
    )
}

export default Cancelled