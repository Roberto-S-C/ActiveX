import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import ProductScene from './ProductScene'
import { Link, useNavigate } from 'react-router'

function ProductManagement({ product, setShowDeleteProductConfirmation, setDeleteProductId, setScrollY }) {    
    const navigate = useNavigate()

    return (
        <div className='flex flex-col'>
            <div>
                <ProductScene
                    model={product.file3DModel}
                    scale={2.0}
                    height={300}
                    remote={true}
                />
            </div>
            <div className='flex flex-col w-full pl-1 gap-2 bg-slate-300'>
                <div className='flex flex-col items-center gap-2'>
                    <Link to={`/products/${product.id}`} 
                        className='text-xl underline text-red-600 hover:text-red-700 font-bold'
                    >
                        {product.name}
                    </Link>
                    <h4 className='text-xl text-slate-600 font-bold'>{product.price} $</h4>
                </div>
                <div className='flex justify-around mb-1'>
                    <div onClick={() => navigate(`/products/edit/${product.id}`)}>
                        <PencilSquareIcon className='h-6 w-6 text-slate-400 hover:text-red-600 cursor-pointer' />
                    </div>
                    <div onClick={() => {
                        setDeleteProductId(product.id)
                        setShowDeleteProductConfirmation(true)
                        setScrollY(window.scrollY)
                        
                    }}>
                        <TrashIcon className='h-6 w-6 text-slate-400 hover:text-red-600 cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductManagement