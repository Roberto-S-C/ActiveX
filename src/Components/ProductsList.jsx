import React, { useEffect, useState, useContext } from 'react'
import ProductScene from './ProductScene'
import { Link } from 'react-router'
import { ProductListContext } from '../main';

function ProductsList() {

  const { productList, setProductList } = useContext(ProductListContext);

  return (
    productList ? (
    <div className='container mx-auto flex flex-wrap justify-center h-screen'>
      {productList.map((product) => (
        <div key={product.id}>
          <ProductScene model={product.file3DModel} scale={0.1} height={"70%"} background={''} />
          <div className='bg-slate-200 hover:cursor-pointer mx-3'>
            <Link to={`/products/${product.id}`}>
              <h2 className='text-xl text-red-600 font-bold px-1'>{product.name}</h2>
              <p className='font-bold px-1'>{product.price} $</p>
            </Link>
          </div>
        </div>
      ))}
    </div>) : (
      <h1>Loading...</h1>)
  )
}

export default ProductsList