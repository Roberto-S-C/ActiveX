import React from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router'

function AddressInfo({ address, setShowDeleteAddressConfirmation, setAddressId, setScrollY }) {
    const navigate = useNavigate()

    return (
        <div key={address.id} className='flex flex-col justify-between flex-1 gap-2 p-2 border rounded-md'>
            <div className='flex flex-col items-center gap-1'>
                <span className='font-bold text-lg text-red-600'>{address.fullName}</span>
                <span className='text-slate-500'>Address: {address.street} {address.number}</span>
                <span className='text-slate-500'>City: {address.city}, {address.state}</span>
                <span className='text-slate-500'>Country: {address.country}</span>
                <span className='text-slate-500'>Zip Code: {address.postalCode}</span>
                <span className=' text-slate-500'>Contact: {address.phone}</span>
            </div>
            <div className='flex justify-around mt-2'>
                <button onClick={() => navigate(`/address/update/${address.id}`)}>
                    <PencilSquareIcon className='w-6 h-6 text-slate-300 hover:text-red-600 hover:cursor-pointer' />
                </button>
                <button onClick={() => {
                    setShowDeleteAddressConfirmation(true)
                    setAddressId(address.id)
                    setScrollY(window.scrollY)
                }}>
                    <TrashIcon className='w-6 h-6 text-slate-300 hover:text-red-600 hover:cursor-pointer' />
                </button>
            </div>
        </div>
    )
}

export default AddressInfo