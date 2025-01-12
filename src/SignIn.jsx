import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import logo from './assets/logo.png'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router'
import { useCookies } from 'react-cookie'
import signIn from './scripts/signIn'
import { ToastContainer, toast } from 'react-custom-alert'
import 'react-custom-alert/dist/index.css';

function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { username: '', email: '', password: '' } })

    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState('password')

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    let navigate = useNavigate()
    const onSubmit = async (data) => {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status === 200) {
            let token = await signIn(data)
            setCookie('token', token)
            navigate('/')
            return
        }
        if (response.status === 400) toast.error('Invalid Credentials')
    }


    return (
        <div className='flex flex-col justify-center items-center container mx-auto h-screen'>
            <ToastContainer />
            <div className='flex flex-col items-center w-1/3 h-3/5 p-4 rounded-lg bg-slate-200'>
                <div className='flex flex-col justify-center items-center w-full h-1/3'>
                    <img src={logo} className='w-1/6' />
                    <h2 className='text-red-600 text-2xl font-bold'>Sign In</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-around w-full h-2/3'>
                    <input type='text' placeholder='Username' name='username'
                        {...register('username', { required: true, maxLength: 50 })}
                        aria-invalid={errors.username ? "true" : "false"}
                        className='w-full p-2 my-2 border border-gray-300 rounded-lg' />
                    {errors.username?.type === 'required' && <p role="alert" className='text-red-600 pl-2'>Username is required</p>}

                    <div className='relative flex items-center'>
                        <input type={inputType} placeholder='Password' name='password'
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 12,
                                    message: 'Password must be at least 12 characters'
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/,
                                    message: 'Password must contain 1 uppercase letter, 1 number, and 1 special character'
                                }
                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                            className='w-full p-2 my-2 border border-gray-300 rounded-lg' />
                        {showPassword ? (
                            <EyeSlashIcon onClick={() => {
                                setShowPassword(false)
                                setInputType('password')
                            }} className='absolute right-2 size-6 text-gray-500 hover:cursor-pointer' />
                        ) : (
                            <EyeIcon onClick={() => {
                                setShowPassword(true)
                                setInputType('text')
                            }} className='absolute right-2 size-6 text-gray-500 hover:cursor-pointer' />
                        )}

                    </div>
                    {errors.password && (
                        <p role="alert" className='text-red-600 pl-2'>
                            {errors.password.message}
                        </p>
                    )}

                    <div className='flex justify-center'>
                        <button type='submit' className='bg-red-600 w-1/4 p-2 rounded-lg text-white text-lg hover:bg-red-700 hover:cursor-pointer'>Submit</button>
                    </div>
                </form>
            </div>

            <p className='m-1 text-red-600'>Don't have an account? <Link to='/signup' className='underline'>Sign Up</Link></p>
        </div>
    )
}

export default SignIn