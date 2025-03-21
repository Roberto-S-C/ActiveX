import React, { useState, useEffect } from 'react'
import getProduct from '../scripts/Product/getProduct'

function OrderItems({ orderItems }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        Promise.all(orderItems.map(orderItem => getProduct(orderItem.productId)))
            .then(fetchedProducts => {
                setProducts(fetchedProducts)
            })
            .catch(error => {
                console.error('Error fetching products:', error)
            })
    }, [orderItems])

    return (
        products.length > 0 &&
        <div className='flex flex-col gap-3 '>
            {products.map((product, index) => {
                const orderItem = orderItems[index]
                return (
                    <div key={product.id} className='flex flex-col border-t-2'>
                        <div className='flex justify-between'>
                            <span>{product.name}</span>
                            <span>{orderItem.price * orderItem.quantity}$</span>
                        </div>
                        <span>Price: {orderItem.price}$</span>
                        <span>Quantity: {orderItem.quantity}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default OrderItems