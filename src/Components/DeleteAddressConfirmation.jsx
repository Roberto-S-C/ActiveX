import { XMarkIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'
import deleteAddress from '../scripts/Address/deleteAddress'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'

function DeleteAddressConfirmation({ addressId, addresses, setAddresses, setShowDeleteAddressConfirmation, setAlertDetails, setShowAlert, scrollY }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.token) {
      return navigate('/signin')
    }
  }, [])

  return (
    <div
      className='flex justify-center items-center absolute z-10 w-full h-screen bg-slate-100 bg-opacity-80'>

      <div className='relative w-full h-full'>
        <div
          className='absolute w-11/12 md:w-1/2 lg:w-1/3'
          style={{ top: scrollY, left: '50%', translate: ('0', '-50%') }}
        >
          <div className='relative flex flex-col justify-center items-center p-4 gap-3 rounded-lg bg-white'>
            <div className='absolute top-0 right-0 p-1 cursor-pointer' onClick={() => setShowDeleteAddressConfirmation(false)}>
              <XMarkIcon className='size-5 text-red-600' />
            </div>

            <h3 className='mt-3 text-center text-lg font-bold text-red-600'>Do you want to delete this item?</h3>
            <ExclamationTriangleIcon className='size-14 text-red-600' />
            <h4 className='text-center'>This action can not be reversed.</h4>
            <button
              onClick={() => {
                deleteAddress(cookies.token, addressId, setAlertDetails, setShowAlert, addresses, setAddresses)
                setShowDeleteAddressConfirmation(false)
              }}
              className='w-3/4 p-2 mt-1 rounded-md text-lg font-bold text-white bg-slate-300 hover:bg-red-600'
            >
              Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAddressConfirmation