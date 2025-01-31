import React, { useContext, useState, useEffect } from 'react'
import Select from 'react-select'
import { ProductListContext } from '../main'
import { useNavigate } from 'react-router'

function Categories({ categories, selectedCategory, setSelectedCategory, search }) {

    const { productList, setProductList } = useContext(ProductListContext);

    const navigate = useNavigate()

    const selectCategory = async (category) => {
        setSelectedCategory(category.value)
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?name=${search}&category=${category.value}`)
        let data = await response.json()
        setProductList(data)
        navigate('/')
    }

    return (
        <Select
            value={categories[selectedCategory]}
            options={categories}
            onChange={selectCategory}
            styles={{
                dropdownIndicator: (provided) => ({
                    ...provided,
                    color: '#dc2626',
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#e8ecf4' : state.isFocused ? '#e8ecf4' : undefined,
                    color: state.isSelected ? 'white' : 'black',
                }),
            }}
        />
    )
}

export default Categories