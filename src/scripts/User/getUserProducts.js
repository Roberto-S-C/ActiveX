async function getUserProducts(token) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/products`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) return await response.json()
    return null 
}

export default getUserProducts