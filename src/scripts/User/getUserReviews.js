async function getUserReviews(token) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/reviews`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
}

export default getUserReviews