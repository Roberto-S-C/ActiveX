import React, { useState } from 'react'
import { StarIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { StarIcon as StarIconOutlined } from '@heroicons/react/24/outline'

function Review({ review }) {
    const [stars, setStars] = useState([1, 2, 3, 4, 5])

    return (
        <div className='flex flex-col justify-between'>
            <div className='flex items-center'>
                <UserCircleIcon className='w-6 h-6 text-red-600' />
                <p className='m-1'>{review.userName}</p>
                <p>{review.createdAt}</p>
            </div>
            <div className='flex flex-col'>
                <h4 className='font-bold text-red-600 mr-1'>{review.productName}</h4>
                <div className='flex'>
                    {
                        stars.map((i) => {
                            return i <= review.stars ? <StarIcon key={i} className='w-5 h-5 text-yellow-400' /> : <StarIconOutlined key={i} className='w-5 h-5 text-yellow-400' />
                        })
                    }
                </div>
            </div>
            <p className='break-words font-bold'>{review.title}</p>
            <p className='break-words'>{review.content}</p>
        </div>
    )
}

export default Review