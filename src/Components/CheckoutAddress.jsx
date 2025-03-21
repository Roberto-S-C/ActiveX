import React, { useContext, useEffect, useState } from 'react'
import getUserAddresses from '../scripts/Address/getUserAddresses'
import Select from 'react-select'
import { useCookies } from 'react-cookie'
import { XMarkIcon } from '@heroicons/react/24/solid'
import AddressForm from './AddressForm'
import checkout from '../scripts/Checkout/checkout'
import { useNavigate } from 'react-router'
import createAddress from '../scripts/Address/createAddress'
import Alert from './Alert'

function CheckoutAddress({ products, setShowCheckoutAddress }) {
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [showAddressSelect, setShowAddressSelect] = useState(true)

    const [showAlert, setShowAlert] = useState(false)
    const [alertDetails, setAlertDetails] = useState({ status: '', message: '', duration: 1500 })

    const [cookies, setCookies, remove] = useCookies(['token'])
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookies.token) {
            navigate('/signin')
        }
        getUserAddresses(cookies.token)
            .then(addresses => {
                if (addresses.length > 0) {
                    setAddresses(addresses)
                    setSelectedAddress({
                        value: addresses[0].id,
                        label: `${addresses[0].street}, ${addresses[0].number}, ${addresses[0].city}, ${addresses[0].state}`
                    })
                }
            })
    }, [showAddressForm])

    const addressOptions = addresses.map(address => ({
        value: address.id,
        label: `${address.street}, ${address.number}, ${address.city}, ${address.state}`
    }))

    return (
        (showAddressForm || showAddressSelect) &&
        <div
            className='absolute z-10 flex justify-center items-center w-full p-4'
            style={
                {
                    top: window.scrollY + 10,
                    height: window.innerHeight - 20,
                }
            }
        >
            {showAlert && <Alert alertDetails={alertDetails} setShowAlert={setShowAlert} positionY={20} />}
            <div
                className='relative flex flex-col w-full md:w-2/3 lg:w-2/5 p-4 gap-8 border border-gray-300 rounded-lg bg-white'
                style={{ height: showAddressForm ? '100%' : 'auto' }}
            >
                <div className='absolute top-0 right-0 p-2'>
                    <XMarkIcon onClick={() => setShowCheckoutAddress(false)} className='size-6 text-red-600 hover:text-red-700 hover:cursor-pointer' />
                </div>
                <h3 className='font-bold text-2xl text-center text-red-600'>Shipping Address</h3>

                {showAddressSelect && !showAddressForm &&
                    <div>
                        <Select
                            options={addressOptions}
                            onChange={setSelectedAddress}
                            value={selectedAddress}
                        />
                        <button
                            className='font-bold text-slate-400 hover:text-slate-500'
                            onClick={() => {
                                setShowAddressForm(true)
                            }}
                        >
                            Add Address
                        </button>
                        <div className='flex justify-center mt-4'>
                            <button
                                onClick={() => {
                                    if (!selectedAddress) {
                                        setAlertDetails({ status: 'error', message: 'Please select an address', duration: 1500 })
                                        setShowAlert(true)
                                        return
                                    }
                                    localStorage.setItem('shippingAddressId', JSON.stringify(selectedAddress.value))
                                    checkout(products, cookies.token, navigate)
                                }}
                                className='w-1/2 p-2 rounded-lg font-bold text-xl text-white bg-red-600 hover:bg-red-700'
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                }

                {showAddressForm &&
                    <div className='h-full'>
                        <AddressForm onSubmit={createAddress} setAlertDetails={setAlertDetails} setShowAlert={setShowAlert} setShowAddressForm={setShowAddressForm} />
                    </div>
                }
            </div>
        </div>
    )
}

export default CheckoutAddress