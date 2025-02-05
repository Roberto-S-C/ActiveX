import { CloudArrowUpIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect } from 'react'
import Categories from './Components/Categories'
import getCategories from './scripts/getCategories'
import Header from './Components/Header'
import AddCategory from './Components/AddCategory'
import { useForm } from 'react-hook-form'
import validateFile from './scripts/AddProduct/validateFile'
import changePrice from './scripts/AddProduct/changePrice'
import createProductRequest from './scripts/AddProduct/createProductRequest'
import Alert from './Components/Alert'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'

function AddProduct() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(0)

  const [showCategoryModal, setShowCategoryModal] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [price, setPrice] = useState(0)

  const [model, setModel] = useState(null)
  const [validModel, setValidModel] = useState(false)

  const [showAlert, setShowAlert] = useState(false)
  const [alertDetails, setAlertDetails] = useState({})

  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [token, setToken] = useState(null)

  const navigate = useNavigate()

  const validatePrice = (e) => {
    let value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value)
    }
  }

  const selectCategory = async (category) => {
    setSelectedCategory(category.value)
  }

  useEffect(() => { getCategories().then(categories => setCategories(categories)) }, [showCategoryModal])
  useEffect(() => {
    if (!cookies.token) {
      return navigate("/signin")
    }
    setToken(cookies.token)
  }, [])

  return (
    <div className='relative'>
      <Header title={'Create Product'} />

      {showAlert && <Alert alertDetails={alertDetails} showAlert={showAlert} setShowAlert={setShowAlert} />}

      {showCategoryModal &&
        <div className='absolute top-0 left-0 w-full h-full z-10 bg-slate-200 bg-opacity-80 flex justify-center items-center'>
          <AddCategory setShowCategoryModal={setShowCategoryModal} />
        </div>
      }

      <form onSubmit={handleSubmit((data) => createProductRequest(data, model, selectedCategory, setShowAlert, setAlertDetails, token))} className='flex items-center h-screen z-0'>

        <div className='w-1/2'>
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

        <div className='flex flex-col items-center justify-around w-1/2 h-full'>

          <div className='flex flex-col w-1/2'>
            <input
              {...register('name', { required: 'Name is required' })}
              name='name'
              type='text'
              placeholder='Name'
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

          <input type='submit' value='Create' className='w-1/2 p-4 text-2xl rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer' />
        </div>
      </form>
    </div>
  )
}
export default AddProduct