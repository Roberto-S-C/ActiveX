import React from 'react'
import { StarIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { StarIcon as StarIconOutlined } from '@heroicons/react/24/outline'

function Review() {
    return (
        <div>
            <div className='flex items-center'>
                <UserCircleIcon className='w-6 h-6 text-red-600' />
                <p>Manolo</p>
            </div>
            <div className='flex items-center'>
                <StarIcon className='w-6 h-6 text-yellow-600' />
                <StarIcon className='w-6 h-6 text-yellow-600' />
                <StarIcon className='w-6 h-6 text-yellow-600' />
                <StarIcon className='w-6 h-6 text-yellow-600' />
                <StarIconOutlined className='w-6 h-6 text-yellow-600' />
            </div>
            <p>November 13 2024</p>
            <p>Great product, I love it!</p>
            <p>I would recommend this to anyone!</p>
        </div>
    )
}

export default Review