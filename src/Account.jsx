import { ChevronLeftIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'
import Review from './Components/Review'

function Account() {
  const [userInfo, setUserInfo] = useState(null)
  const [reviews, setReviews] = useState(null)

  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const navigate = useNavigate()
  useEffect(() => {
    if (!cookies.token) {
      return navigate('/signin')
    }
    async function getUserInfo() {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookies.token}`
        }
      })
      setUserInfo(await response.json())
    }

    getUserInfo()

    async function getUserReviews() {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/reviews`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookies.token}`
        }
      })

      let reviews = await response.json()
      if (reviews.length > 0) setReviews(reviews)
    }

    getUserReviews()
  }, [])

  return (
    <div>
      <div className='flex justify-center items-center relative bg-red-600'>
        <button onClick={() => navigate('/')} className='absolute left-0'>
          <ChevronLeftIcon className='h-8 w-8 text-white font-bold hover:text-slate-200' />
        </button>
        <h1 className='text-white text-2xl font-bold p-3'>Account</h1>
      </div>
      {userInfo &&
        <div className='flex flex-wrap container mx-auto'>
          <div className='w-1/4'>
            <div className='flex justify-center'>
              <UserCircleIcon className='mb-10 text-red-600 size-full' />
            </div>
          </div>
          <div className='flex flex-col justify-evenly w-3/4'>
            <h1 className='text-2xl font-bold'><span className='text-red-600'>Username:</span> {userInfo.userName}</h1>
            <h2 className='text-xl font-bold'><span className='text-red-600'>Email:</span> {userInfo.email}</h2>
            <span className='w-28 p-2 rounded-lg text-white font-bold text-lg text-center'>{userInfo.role}</span>
          </div>

        </div>}

      <div className='container mx-auto'>
        <h3 className='text-red-600 font-bold text-2xl'>Reviews</h3>
        <hr className='mt-2' />
        {reviews ?
          <div className='mt-4'>
            {reviews.map(review => <Review key={review.id} review={review} />)}
          </div>
          :
          <h1 className='pt-1'>No reviews available...</h1>
        }
      </div>

    </div>
  )
}

export default Account