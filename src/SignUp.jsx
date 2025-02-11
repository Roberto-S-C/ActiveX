import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import logo from './assets/logo.png'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router'
import { useCookies } from 'react-cookie'
import signIn from './scripts/signIn'
import Alert from './Components/Alert'

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { username: '', email: '', password: '' } })

  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState('password')

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [showAlert, setShowAlert] = useState(false)
  const [alertDetails, setAlertDetails] = useState({})

  let navigate = useNavigate()
  const onSubmit = async (data) => {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/account/register`, {
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
    if (response.status === 400) {
      setAlertDetails({ status: 'error', message: 'Username or email already exists', duration: 2000 })
      setShowAlert(true)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center container mx-auto h-screen'>

      {showAlert && <Alert
        alertDetails={alertDetails}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />}

      <div className='flex flex-col items-center w-1/3 h-3/4 p-4 rounded-lg bg-slate-200'>
        <div className='flex flex-col justify-center items-center w-full h-1/3'>
          <img src={logo} className='w-1/6' />
          <h2 className='text-red-600 text-2xl font-bold'>Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-around w-full h-2/3'>
          <input type='text' placeholder='Username' name='username'
            {...register('username', { required: true, maxLength: 50 })}
            aria-invalid={errors.username ? "true" : "false"}
            className='w-full p-2 my-2 border border-gray-300 rounded-lg' />
          {errors.username?.type === 'required' && <p role="alert" className='text-red-600 pl-2'>Username is required</p>}

          <input type='email' placeholder='Email' name='email'
            {...register('email', { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
            className='w-full p-2 my-2 border border-gray-300 rounded-lg' />
          {errors.email?.type === 'required' && <p role="alert" className='text-red-600 pl-2'>Email is required</p>}

          <div className='relative flex items-center'>
            <input type={inputType} placeholder='Password' name='password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
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

      <p className='m-1 text-red-600'>Already have an account? <Link to='/signin' className='underline'>Sign In</Link></p>
    </div>
  )
}

export default SignUp