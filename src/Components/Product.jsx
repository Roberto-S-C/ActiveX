import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import ProductScene from './ProductScene'

import Review from './Review'
import { ShoppingBagIcon } from '@heroicons/react/20/solid'

function Product() {
    const [product, setProduct] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
    }, [])

    product && console.log(product)

    return (
        product ? (<div className='lg:flex lg:h-screen'>
            <div className='lg:w-1/2 h-screen'>
                <ProductScene model={product.file3DModel} scale={0.1} height={"100%"} background={"white"} />
            </div>
            <div className='lg:w-1/2 flex flex-col mt-5'>
                <h1 className='text-4xl font-bold'>{product.name}</h1>
                <div className='flex my-3'>
                    <h2 className='text-lg p-2 rounded-xl bg-red-600 text-white'>{product.category.name}</h2>
                </div>
                <p className='text-lg font-bold'>{product.price} $</p>
                <div className='flex items-center my-3'>
                    <button className='flex p-3 text-xl font-bold bg-red-600 text-white rounded-lg hover:bg-red-700'>Add to cart <ShoppingBagIcon className='size-6 ml-2' /> </button>
                </div>
                <div className='w-3/4 rounded-lg'>
                    <h3 className='text-center text-2xl text-red-600 font-bold'>Reviews</h3>
                    {
                    (product.reviews.length > 0) ? 
                    product.reviews.map((review) => (<Review review={review} />))
                    : <h1>No reviews available...</h1>
                    }
                </div>
            </div>
        </div>) : (<h1>Loading...</h1>)
    )
}

export default Product