import React, { useState, useEffect, useContext } from 'react'
import Categories from './Categories'
import SearchBar from './SearchBar'
import { ProductListContext } from '../main'
import { useNavigate } from 'react-router'
import getCategories from '../scripts/Category/getCategories'

function Filtering({ setLoadingProducts }) {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)

    const [search, setSearch] = useState('')
    const { productList, setProductList } = useContext(ProductListContext);

    const navigate = useNavigate()

    const selectCategory = async (category) => {
        setLoadingProducts(true)
        setSelectedCategory(category.value)
        fetch(`${import.meta.env.VITE_API_URL}/api/products?name=${search}&category=${category.value}`)
            .then(response => response.json())
            .then(data => {
                setProductList(data)
                setLoadingProducts(false)
            })
            .catch(error => {
                console.error('Error fetching products:', error)
                setLoadingProducts(false)
            })
        navigate('/products')
    }

    useEffect(() => { 
        setLoadingProducts(true)
        getCategories()
            .then(categories => {
                setCategories(categories)
                setLoadingProducts(false)
            }) 
    }, [])

    return (
        <div className='flex justify-center items-center w-full'>
            <div className='w-1/2 md:w-1/3 mx-2'>
                {categories.length > 0 && <Categories categories={categories} selectCategory={selectCategory} selectedCategory={selectedCategory} />}
            </div>
            <div className='w-1/2 md:w-2/3 mx-2'>
                {categories.length > 0 && <SearchBar selectedCategory={selectedCategory} setSearch={setSearch} />}
            </div>
        </div>
    )
}

export default Filtering