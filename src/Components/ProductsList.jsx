import React from 'react'
import ProductScene from './ProductScene'

const models = [
  'soccer.glb',
  'football.glb',
  'basketball.glb',
  'chess_board.glb',
  'golf_club.glb',
]

function ProductsList({ products }) {
  return (
    <div className='container mx-auto flex flex-wrap justify-center bg-green-100'>

      {models.map((model, index) => (
        <div key={index} className='border-2 border-black'>
          <ProductScene model={`/Models/${model}`} scale={0.1} height={"auto"} />
          <div className='hover:cursor-pointer bg-blue-500'>
            <h2>Soccer ball</h2>
            <p>19.99 $</p>
          </div>
        </div>
      ))}

    </div>
  )
}

export default ProductsList