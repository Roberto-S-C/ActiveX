import React, { useState, useEffect } from 'react'

function OrderInfo({ order }) {

    const [address, setAddress] = useState('')

    useEffect(() => {
        if (order.address) {
            setAddress(`${order.address.street} ${order.address.number}, ${order.address.city}, ${order.address.state}, ${order.address.country}`)
        }
    }, [])

    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-center font-bold text-3xl text-red-600'>Order</h3>
            <div className='flex gap-1'>
                <span className='font-bold text-lg text-red-600'>Address:</span>
                <span>{address}</span>
            </div>
            <div className='flex gap-1'>
                <span className='font-bold text-lg text-red-600'>Phone:</span>
                <span>{order.address.phone}</span>
            </div>
            <div className='flex justify-between'>
                <div>
                    <span className='font-bold text-lg text-red-600'>Total: </span>
                    <span>{order.amount / 100}$</span>
                </div>
                {order.status === 'paid'
                    ? <span className='font-bold text-green-600'>{order.status.toUpperCase()}</span>
                    : <span className='font-bold text-red-600'>{order.status.toUpperCase()}</span>
                }
            </div>
        </div>
    )
}
export default OrderInfo