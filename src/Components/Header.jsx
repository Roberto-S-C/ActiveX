import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import getProducts from '../scripts/getProducts'
import { ProductListContext } from '../main'

function Header({ title }) {

    const navigate = useNavigate()
    const { productList, setProductList } = useContext(ProductListContext);

    return (
        <div className='flex justify-center items-center relative bg-red-600'>
            <button onClick={() => {
                getProducts()
                    .then(data => setProductList(data))
                navigate('/products')
            }} className='absolute left-0'>
                <ChevronLeftIcon className='h-8 w-8 text-white font-bold hover:text-slate-200' />
            </button>
            <h1 className='text-white text-3xl font-bold p-3'>{title}</h1>
        </div>
    )
}

export default Header