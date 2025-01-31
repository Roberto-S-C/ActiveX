import React, { useState, useEffect } from 'react'
import Categories from './Categories'
import SearchBar from './SearchBar'

function Filtering() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)

    const [search, setSearch] = useState('')

    const getCategories = async () => {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
        let data = await response.json()
        data.unshift({ id: 0, name: 'Categories' })
        return data.map(category => {
            return { value: category.id, label: <span className='text-red-600 font-bold'>{category.name}</span> }
        })
    }

    useEffect(() => { getCategories().then(categories => setCategories(categories)) }, [])

    return (
        <div className='flex justify-center items-center w-full'>
            {categories.length > 0 && <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} search={search} />}
            {categories.length > 0 && <SearchBar selectedCategory={selectedCategory} setSearch={setSearch} />}
        </div>
    )
}

export default Filtering