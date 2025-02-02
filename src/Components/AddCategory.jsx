import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

function AddCategory({ setShowCategoryModal }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const navigate = useNavigate()

    const createCategory = async (data) => {
        let token = cookies.token 
        if(!token) {
            return navigate('/signin')
        }

        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if(response.ok) {
            return setShowCategoryModal(false)
        }

        if(response.status === 409) {
            setShowCategoryModal(false) 
        }
    }

    return (
        <div className='relative bg-white w-1/3 rounded-lg'>
            <XMarkIcon onClick={() => setShowCategoryModal(false)} className='absolute top-2 right-2 size-6 text-slate-400 hover:text-red-600 hover:cursor-pointer' />

            <span className='block w-full py-8 text-2xl text-center font-bold text-red-600'>Add Category</span>

            <form onSubmit={handleSubmit(createCategory)} className='flex flex-col items-center justify-center'>
                <input
                    type='text'
                    name='name'
                    {...register('name', { required: true, })}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    placeholder='Name'
                    className='w-2/3 border-b-2 border-slate-400 text-lg font-medium text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent'
                />
                {errors.name && <span className='w-2/3 m-1 text-red-600'>Name is required</span>}
                <input type='submit' value={'Create'} className='w-1/2 m-8 p-3 rounded-md text-white text-xl font-bold bg-red-600 hover:bg-red-700 hover:cursor-pointer' />
            </form>
        </div>
    )
}

export default AddCategory