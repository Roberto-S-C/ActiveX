import React, { useEffect, useState } from 'react'
import ProductScene from './ProductScene'
import { Link } from 'react-router'

const models = [
  'soccer.glb',
  'football.glb',
  'basketball.glb',
  'chess_board.glb',
  'golf_club.glb',
]

function ProductsList() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    products ? (
    <div className='container mx-auto flex flex-wrap justify-center h-screen'>
      {products.map((product) => (
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