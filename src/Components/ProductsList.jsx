import React, { useEffect, useState, useContext } from 'react'
import ProductScene from './ProductScene'
import { Link } from 'react-router'
import { ProductListContext } from '../main';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

function ProductsList() {

  const { productList, setProductList } = useContext(ProductListContext);

  return (
    productList.length > 0 ? (
    <div className='container mx-auto flex flex-wrap justify-center'>
      {productList.map((product) => (
        <div key={product.id} className='mx-2 my-2'>
          <ProductScene model={product.file3DModel} scale={0.1} height={"85%"} background={''} remote={true} />
          <div className='bg-slate-200 hover:cursor-pointer'>
            <Link to={`/products/${product.id}`}>
              <h2 className='text-xl text-red-600 font-bold px-1'>{product.name}</h2>
              <p className='font-bold px-1'>{product.price} $</p>
            </Link>
          </div>
        </div>
      ))}
    </div>) : (
      <div className='flex flex-col items-center justify-center h-screen'>
        <ExclamationTriangleIcon className='size-20 text-red-600' />
        <h3 className='my-3 text-center text-4xl text-slate-400'>Product not found...</h3>
      </div>
    )
  )
}

export default ProductsList