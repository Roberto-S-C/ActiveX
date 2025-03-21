import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import getOrder from '../scripts/Order/getOrder'
import OrderItems from './OrderItems'
import OrderInfo from './OrderInfo'
import { XMarkIcon } from '@heroicons/react/24/solid'

function OrderDetails({ orderId, setShowOrderDetails, scrollY }) {

    const [order, setOrder] = useState(null)

    const [cookies, setCookies, remove] = useCookies(['token'])

    useEffect(() => {
        getOrder(orderId, cookies.token)
            .then(order => {
                setOrder(order)
            })
    }, [])

    return (
        <div
            className='absolute z-10 flex justify-center items-center w-full h-full'
            style={{ top: scrollY }}
        >
            {
                order &&
                <div className='relative flex flex-col border rounded-lg p-4 bg-white'>
                    <XMarkIcon 
                        onClick={() => setShowOrderDetails(false)}
                        className='absolute top-0 right-0 p-2 size-10 text-red-600 hover:text-red-700 hover:cursor-pointer' 
                    />
                    <div className='flex flex-col gap-4'>
                        <OrderInfo order={order} />
                        <OrderItems orderItems={order.orderItems} />
                    </div>
                </div>
            }

        </div >
    )
}

export default OrderDetails