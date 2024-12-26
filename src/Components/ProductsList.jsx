import React from 'react'
import ProductScene from './ProductScene'
import { Link } from 'react-router'

const models = [
  'soccer.glb',
  'football.glb',
  'basketball.glb',
  'chess_board.glb',
  'golf_club.glb',
]

function ProductsList({ products }) {
  return (
    <div className='container mx-auto flex flex-wrap justify-center h-screen'>

      {models.map((model, index) => (
        <div key={index}>
          <ProductScene model={`/Models/${model}`} scale={0.1} height={"70%"} background={''} />
          <div className='bg-slate-200 hover:cursor-pointer mx-3'>
            <Link to={"/product"}>
              <h2 className='text-xl text-red-600 font-bold px-1'>Soccer ball</h2>
              <p className='font-bold px-1'>19.99 $</p>
            </Link>
          </div>
        </div>
      ))}

    </div>
  )
}

export default ProductsList