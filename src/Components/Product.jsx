import React from 'react'
import ProductScene from './ProductScene'

import Review from './Review'
import { ShoppingBagIcon } from '@heroicons/react/20/solid'

function Product() {
    return (
        <div className='lg:flex lg:h-screen'>
            <div className='lg:w-1/2 h-screen'>
                <ProductScene model={`/Models/soccer.glb`} scale={0.1} height={"100%"} background={"white"} />
            </div>
            <div className='lg:w-1/2 flex flex-col mt-5'>
                <h1 className='text-4xl font-bold'>Soccer ball</h1>
                <div className='flex my-3'>
                    <h2 className='text-lg p-2 rounded-xl bg-red-600 text-white'>Soccer</h2>
                </div>
                <p className='text-lg font-bold'>19.99 $</p>
                <div className='flex items-center my-3'>
                    <button className='flex p-3 text-xl font-bold bg-red-600 text-white rounded-lg hover:bg-red-700'>Add to cart <ShoppingBagIcon className='size-6 ml-2' /> </button>
                </div>
                <div className='w-3/4 rounded-lg'>
                    <h3 className='text-center text-2xl text-red-600 font-bold'>Reviews</h3>
                    <Review />
                    <Review />
                </div>
            </div>
        </div>
    )
}

export default Product