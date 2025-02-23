import React, { useEffect, useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useCookies } from 'react-cookie'

function UserInfo() {
    const [cookies] = useCookies(['token'])
    const [userInfo, setUserInfo] = useState(null)

    async function getUserInfo() {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookies.token}`
            }
        })
        setUserInfo(await response.json())
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        userInfo ? (
            <div className='flex flex-col items-center z-0'>
                <UserCircleIcon className='text-red-600 size-38' />
                {userInfo.role &&
                    <div className='flex'>
                        <span className='rounded-lg p-2 mb-4 font-bold text-xl text-center text-white bg-red-600'>{userInfo.role}</span>
                    </div>
                }
                <h1 className='text-xl font-bold'><span className='text-red-600'>Username:</span> {userInfo.userName}</h1>
                <h2 className='text-xl font-bold'><span className='text-red-600'>Email:</span> {userInfo.email}</h2>

            </div>
        ) : (
            <h1>Loading</h1>
        )
    )
}

export default UserInfo