import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import ProductScene from './ProductScene'
import { Link, useNavigate } from 'react-router'

function ProductManagement({ product, setShowDeleteConfirmation, setDeleteProductId, setScrollY }) {    
    const navigate = useNavigate()

    return (
        <div className='flex flex-col'>
            <div>
                <ProductScene
                    model={product.file3DModel}
                    scale={1.0}
                    height={300}
                    remote={true}
                />
            </div>
            <div className='flex flex-col w-full pl-1 gap-2 bg-slate-300'>
                <div className='flex flex-col items-center gap-2'>
                    <Link to={`/product/${product.id}`} className='underline text-red-600 hover:text-red-700'>{product.name}</Link>
                    <h4 className='text-slate-700'>{product.price} $</h4>
                </div>
                <div className='flex justify-around'>
                    <div onClick={() => navigate(`/products/edit/${product.id}`)}>
                        <PencilSquareIcon className='h-6 w-6 text-slate-400 hover:text-red-600 cursor-pointer' />
                    </div>
                    <div onClick={() => {
                        setDeleteProductId(product.id)
                        setShowDeleteConfirmation(true)
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