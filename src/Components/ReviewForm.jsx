import { XMarkIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import Stars from './Stars'
import { useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'

function ReviewForm({ setShowReviewForm, setAlertDetails, setShowAlert, onSubmit, stateFunction, itemId, scrollY }) {
    const [starsValue, setStarsValue] = useState(0)
    const [invalidStars, setInvalidStars] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const navigate = useNavigate()

    return (
        <div 
            className='absolute flex flex-col w-full h-full z-10 '
            style={{ top: scrollY }}
        >
            <div className='relative flex flex-col gap-3 w-1/2 mx-auto mt-20 p-5 bg-white border rounded-xl'>
                <button onClick={() => setShowReviewForm(false)} className='absolute top-2 right-2'>
                    <XMarkIcon className='size-6 text-red-600 hover:cursor-pointer hover:text-red-700' />
                </button>
                <h1 className='mb-2 text-3xl text-center text-red-600 font-bold'>Add Review</h1>
                <form
                    onSubmit={handleSubmit((data) => {
                        if(!cookies.token) {
                            navigate('/signin')
                            return
                        }
                        if (starsValue === 0 || starsValue > 5) {
                            setInvalidStars(true)
                            return
                        }
                        let fields = {
                            title: data.title,
                            content: data.content,
                            stars: starsValue,
                            id: itemId
                        }
                        let alert = {
                            setAlertDetails,
                            setShowAlert
                        }
                        let token = cookies.token
                        return onSubmit(fields, alert, token, stateFunction, setShowReviewForm)
                    })}
                    className='flex flex-col items-center gap-3'>

                    <div className='flex flex-col items-center'>
                        <Stars starsValue={starsValue} setStarsValue={setStarsValue} />
                        {invalidStars && <span className='text-red-600'>Please select a valid number of stars</span>}
                    </div>

                    <div className='flex flex-col w-4/5'>
                        <input
                            type='text'
                            placeholder='Title'
                            name='title'
                            {...register('title', { required: true })}
                            aria-invalid={errors.title ? "true" : "false"}
                            className='w-full border-b-2 border-slate-400 text-lg font-bold text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent'
                        />
                        {errors.title && <span className='text-start text-red-600'>This field is required</span>}
                    </div>

                    <div className='flex flex-col w-4/5'>
                        <label htmlFor='content' className='text-lg font-bold text-slate-400 hover:cursor-pointer hover:text-slate-600'>Content</label>
                        <textarea
                            id='content'
                            name='content'
                            {...register('content', { required: true, maxLength: 300 })}
                            aria-invalid={errors.content ? "true" : "false"}
                            rows={5}
                            className='w-full border-2 border-slate-200 rounded-md text-lg font-medium text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent resize-none'
                        />
                        {errors.content && errors.content.type === 'required' && <span className='text-red-600'>This field is required</span>}
                        {errors.content && errors.content.type === 'maxLength' && <span className='text-red-600'>Content cannot exceed 300 characters</span>}
                    </div>

                    <button className='w-1/3 p-2 mt-2 text-xl font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white'>Add Review</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm