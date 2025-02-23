import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'

function Alert({ alertDetails, setShowAlert, positionY = 5 }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false)
        }, alertDetails.duration)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div 
            className='flex justify-center absolute w-full z-20'
            style={{top: positionY}}>
            {alertDetails.status === 'success' && (
                <div className='flex justify-center items-center w-1/3 gap-2 p-2 rounded-lg border bg-green-100'>
                    <CheckCircleIcon className='size-8 text-green-600' />
                    <p className='text-xl font-bold text-green-600'>{alertDetails.message}</p>
                </div>
            )}

            {alertDetails.status === 'error' && (
                <div className='flex justify-center items-center w-1/3 gap-2 p-2 rounded-lg border bg-red-100'>
                    <ExclamationTriangleIcon className='size-8 text-red-600' />
                    <p className='text-xl font-bold text-red-600'>{alertDetails.message}</p>
                </div>
            )}
        </div>
    )
}

export default Alert