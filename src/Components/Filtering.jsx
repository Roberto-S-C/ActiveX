import React, { useState, useEffect, useContext } from 'react'
import Categories from './Categories'
import SearchBar from './SearchBar'
import { ProductListContext } from '../main'
import { useNavigate } from 'react-router'
import getCategories from '../scripts/getCategories'

function Filtering() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)

    const [search, setSearch] = useState('')
    const { productList, setProductList } = useContext(ProductListContext);

    const navigate = useNavigate()

    const selectCategory = async (category) => {
        setSelectedCategory(category.value)
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?name=${search}&category=${category.value}`)
        let data = await response.json()
        setProductList(data)
        navigate('/products')
    }

    useEffect(() => { getCategories().then(categories => setCategories(categories)) }, [])

    return (
        <div className='flex justify-center items-center w-2/3'>
            <div className='w-1/3 mx-2'>
                {categories.length > 0 && <Categories categories={categories} selectCategory={selectCategory} selectedCategory={selectedCategory} />}
            </div>
            <div className='w-2/3 mx-2'>
                {categories.length > 0 && <SearchBar selectedCategory={selectedCategory} setSearch={setSearch} />}
            </div>
        </div>
    )
}

export default Filtering