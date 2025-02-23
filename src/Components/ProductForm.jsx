import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { CloudArrowUpIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'
import Categories from './Categories'
import ProductScene from './ProductScene'
import changePrice from '../scripts/AddProduct/changePrice'
import validateFile from '../scripts/AddProduct/validateFile'
import getCategories from '../scripts/getCategories'

function ProductForm({ onSubmit, showCategoryModal, setShowCategoryModal, setShowAlert, setAlertDetails, token, product, remote, setRemote }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [price, setPrice] = useState(0)
    const [model, setModel] = useState(null)
    const [validModel, setValidModel] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)

    const navigate = useNavigate()

    const validatePrice = (e) => {
        let value = e.target.value
        if (/^\d*\.?\d*$/.test(value)) {
            setPrice(value)
        }
    }

    useEffect(() => { getCategories().then(categories => setCategories(categories)) }, [showCategoryModal])

    const selectCategory = async (category) => {
        setSelectedCategory(category.value)
    }

    useEffect(() => {
        if (product) {
            setSelectedCategory(product.category.id)
            setPrice(product.price)
            setModel(product.file3DModel)
            setValidModel(true)
        }
    }, [])

    return (
        <form
            onSubmit={handleSubmit((data) => onSubmit(data, model, selectedCategory, price, setShowAlert, setAlertDetails, token, navigate, product, remote))}
            className='flex items-center h-screen z-0'>

            <div className='flex justify-center items-center w-1/2 h-full'>
                {!validModel &&
                    <div>
                        <label className='flex flex-col items-center mb-2 text-2xl font-bold text-slate-400 hover:cursor-pointer hover:text-slate-600' htmlFor='model'>
                            <CloudArrowUpIcon className='size-40 mb-4 text-red-600' />
                            <span>Upload 3D Model</span>
                        </label>
                        <input
                            type='file'
                            accept='.glb'
                            id='model'
                            name='model'
                            onChange={(e) => validateFile({ model: e.target.files, setModel, setValidModel, setShowAlert, setAlertDetails })}
                            className='hidden'
                        />
                    </div>
                }

                {validModel &&
                    <div className='flex flex-col justify-center items-center h-full w-full'>
                        <ProductScene model={model} scale={0.1} height={"80%"} background={'white'} remote={remote} />
                        <div
                            onClick={() => {
                                setModel('')
                                setValidModel(false)
                                setRemote(false)
                            }}
                            className='flex justify-center items-center w-1/2 p-4 rounded-md bg-red-600 hover:bg-red-700 hover:cursor-pointer'
                        >
                            <span className='text-xl font-bold text-white'>Remove</span>
                            <TrashIcon className='size-8 text-white' />
                        </div>
                    </div>
                }

            </div>

            <div className='flex flex-col items-center justify-around w-1/2 h-full'>

                <div className='flex flex-col w-1/2'>
                    <input
                        {...register('name', { required: 'Name is required' })}
                        name='name'
                        type='text'
                        placeholder='Name'
                        defaultValue={product ? product.name : ''}
                        className='w-full border-b-2 border-slate-400 text-2xl font-bold text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent'
                    />
                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                </div>

                <div className='flex flex-col w-1/2'>
                    <label htmlFor='description' className='text-2xl font-bold text-slate-400 hover:cursor-pointer hover:text-slate-600'>Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        id='description'
                        name='description'
                        rows={6}
                        defaultValue={product ? product.description : ''}
                        className='border-2 border-slate-200 rounded-md text-lg font-medium text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent resize-none'
                    />
                    {errors.description && <p className='text-red-600'>{errors.description.message}</p>}
                </div>

                <div className='w-1/2'>
                    {categories.length > 0 && <Categories categories={categories} selectedCategory={selectedCategory} selectCategory={selectCategory} />}
                    <div className='flex items-center hover:cursor-pointer'>
                        <PlusIcon className='size-6 text-slate-400' />
                        <span onClick={() => setShowCategoryModal(true)} className='my-2 text-slate-400'>Add new category...</span>
                    </div>
                </div>

                <div className='flex flex-wrap justify-center w-1/2'>
                    <div className='flex justify-center items-center rounded-l-md p-2 w-1/5 text-5xl bg-slate-400 hover:cursor-pointer hover:bg-red-600'>
                        <MinusIcon onClick={() => changePrice('minus', 10, price, setPrice)} className='size-10 text-white' />
                    </div>
                    <input
                        {...register('price', { required: 'Price is required', min: { value: 0.01, message: 'Price must be at least 0.01' } })}
                        name='price'
                        type='number'
                        value={price}
                        onChange={validatePrice}
                        placeholder='Price'
                        className='w-3/5 text-center border-y-2 border-slate-400 text-lg font-medium text-slate-400 focus:text-red-600 outline-transparent'
                    />

                    <div className='flex justify-center items-center rounded-r-md p-2 w-1/5 text-3xl text-white font-bold bg-slate-400 hover:cursor-pointer hover:bg-red-600'>
                        <PlusIcon onClick={() => changePrice('plus', 10, price, setPrice)} className='size-10 text-white' />
                    </div>

                    {errors.price && <p className='w-full text-red-600'>{errors.price.message}</p>}
                </div>

                <input type='submit' className='w-1/2 p-4 text-2xl rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer' />
            </div>
        </form>
    )
}

export default ProductForm