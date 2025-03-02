import { StarIcon } from '@heroicons/react/24/solid'
import React from 'react'

function Stars({ starsValue, setStarsValue }) {
    return (
        <div className='flex gap-1'>
            {[...Array(5)].map((_, index) => {
                return (
                    <StarIcon
                        key={index}
                        className={`size-8 ${index < starsValue ? 'text-yellow-400' : 'text-slate-400'} hover:cursor-pointer hover:text-yellow-600`}
                        onClick={() => setStarsValue(index + 1)}
                    />
                )
            })}
        </div>
    )
}

export default Stars