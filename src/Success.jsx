import { CheckCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import getStripeSession from './scripts/Checkout/getStripeSession'
import { useCookies } from 'react-cookie'
import createOrder from './scripts/Order/createOrder'
import createOrderItem from './scripts/OrderItem/createOrderItem'
import getProduct from './scripts/Product/getProduct'

function Success() {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const shippingAddressId = localStorage.getItem('shippingAddressId')
    const [order, setOrder] = useState(null)

    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    useEffect(() => {
        if (sessionId && shippingAddressId) {
            getStripeSession(sessionId, cookies.token)
                .then(data => {
                    if (data) {
                        let orderDetails = {
                            stripeSessionId: data.id,
                            amount: data.amountTotal,
                            status: data.paymentStatus,
                            addressId: shippingAddressId
                        }
                        createOrder(orderDetails, cookies.token)
                            .then(response => {
                                if (!response) {
                                    return
                                }
                                setOrder(response)
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }
                })
        }
    }, [sessionId, shippingAddressId])

    useEffect(() => {
        if (order) {
            let bag = localStorage.getItem('bag')
            if (bag) {
                bag = JSON.parse(bag)
                bag.forEach(item => {
                    getProduct(item.id)
                        .then(product => {
                            let orderItem = {
                                orderId: order.id,
                                productId: product.id,
                                price: product.price,
                                quantity: item.quantity
                            }
                            createOrderItem(orderItem, cookies.token)
                                .then(() => {
                                    localStorage.removeItem('bag')
                                }
                                )
                                .catch(e => {
                                    localStorage.removeItem('bag')
                                    console.log(e)
                                })
                        })
                });
            }
        }
    }, [order])

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <CheckCircleIcon className='w-3/5 md:w-2/5 lg:w-1/3 text-green-600' />
            <h2 className='p-2 font-bold text-xl md:text-2xl lg:text-4xl text-center text-slate-400'>Your order has been successfully created.</h2>
        </div>
    )
}

export default Success