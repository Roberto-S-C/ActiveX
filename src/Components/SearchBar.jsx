import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import { ProductListContext } from '../main'
import { useNavigate } from 'react-router'

function SearchBar({ selectedCategory, setSearch }) {

    const {productList, setProductList} = useContext(ProductListContext)

    const navigate = useNavigate()

    const searchProduct = async (event) => {
        let name = event.target.value
        setSearch(name)
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?name=${name}&category=${selectedCategory}`)
        let data = await response.json()
        setProductList(data)
        navigate('/')
    }

    return (
        <div className='relative w-1/2 mx-3'>
            <input type='text' onChange={searchProduct} placeholder='Search' className='w-full pl-9 py-1 rounded-md text-black text-xl' />
            <MagnifyingGlassIcon className='absolute top-1/2 left-1 -translate-y-1/2 size-6 text-red-600' />
        </div>
    )
}

export default SearchBar