import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Categories from './Categories'
import getCategories from '../scripts/Category/getCategories'

function UserProductsFiltering({ setUserProducts }) {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)

    const [search, setSearch] = useState('')

    const selectCategory = async (category) => {
        setSelectedCategory(category.value)
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?name=${search}&category=${category.value}`)
        let data = await response.json()
        setUserProducts(data)
    }

    const searchProduct = async (event) => {
        let name = event.target.value
        setSearch(name)
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?name=${name}&category=${selectedCategory}`)
        let data = await response.json()
        setUserProducts(data)
    }

    useEffect(() => { getCategories().then(categories => setCategories(categories)) }, [])

    return (
        <div className='flex flex-col md:flex-row gap-3 md:gap-0 justify-center items-center w-full'>
            <div className='w-full md:w-1/2 mx-2'>
                {categories.length > 0 && <Categories categories={categories} selectCategory={selectCategory} selectedCategory={selectedCategory} />}
            </div>
            <div className='w-full md:w-1/2 mx-2'>
                <div className='relative w-full border border-gray-300 rounded-md'>
                    <input type='text' onChange={searchProduct} placeholder='Search' className='w-full pl-9 py-1 rounded-md text-black text-xl' />
                    <MagnifyingGlassIcon className='absolute top-1/2 left-1 -translate-y-1/2 size-6 text-red-600' />
                </div>
            </div>
        </div>
    )
}

export default UserProductsFiltering