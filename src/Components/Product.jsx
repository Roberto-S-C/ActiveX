import React from 'react'
import ProductScene from './ProductScene'

function Product() {
    return (
        <div className='lg:flex lg:h-screen border-2'>
            <div className='lg:w-1/2 h-screen bg-blue-300'>
                <ProductScene model={`/Models/soccer.glb`} scale={0.1} height={"100%"} />
            </div>
            <div className='lg:w-1/2'>
                <h1>Soccer ball</h1>
                <p>19.99 $</p>
            </div>
        </div>
    )
}

export default Product