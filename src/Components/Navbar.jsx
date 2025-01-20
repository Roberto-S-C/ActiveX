import React, { useContext, useEffect, useState } from 'react'
import { MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import logo from '../assets/logo.png'
import { Link, Outlet, useNavigate } from 'react-router'
import Select from 'react-select'
import { ProductListContext } from '../main'

function Navbar() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)

    const { productList, setProductList } = useContext(ProductListContext);

    const navigate = useNavigate()

    const getCategories = async () => {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
        let data = await response.json()
        data.unshift({ id: 0, name: 'Categories' })
        return data.map(category => {
            return { value: category.id, label: <span className='text-red-600 font-bold'>{category.name}</span> }
        })
    }

    const selectCategory = async (category) => {
        setSelectedCategory(category.value)
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?category=${category.value}`)
        let data = await response.json()
        setProductList(data)
        navigate('/')
    }

    useEffect(() => {
        getCategories().then(categories => setCategories(categories))
    }, [])

    return (
        <div>
            <div className='relative text-white bg-red-600 px-2 py-5'>
                <div className='absolute top-0 right-3'>
                    <Link className='font-bold text-sm' to='/signup'>Sign Up</Link>
                    <span className='font-bold text-sm mx-2'>|</span>
                    <Link className='font-bold text-sm' to='/signin'>Sign In</Link>
                </div>

                <div className='flex items-center'>
                    <div className='flex justify-start w-1/6'>
                        <a href='/' className='flex items-center justify-center'>
                            <img src={logo} width={60} height={60} alt='logo' className='mr-2' />
                            <h2 className='text-4xl font-bold hover:text-slate-200'>ActiveX</h2>
                        </a>
                    </div>

                    <div className='flex justify-center items-center w-2/3'>
                        {categories.length > 0 &&
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
                            />}

                        <div className='relative w-1/2 mx-3'>
                            <input type='text' placeholder='Search' className='w-full pl-9 py-1 rounded-md text-black text-xl' />
                            <MagnifyingGlassIcon className='absolute top-1/2 left-1 -translate-y-1/2 size-6 text-red-600' />
                        </div>
                    </div>

                    <div className='flex justify-center w-1/6'>
                        <div className='flex justify-around w-full'>
                            <Link to='/account'>
                                <UserCircleIcon className='size-10 hover:text-slate-200' />
                            </Link>
                            <Link to='/shoppingbag'>
                                <ShoppingBagIcon className='size-10 hover:text-slate-200' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default Navbar