async function getUserProducts(token) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/products`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) return await response.json()
    if(response.status === 403) return 'Forbidden' 
    return null 
}

export default getUserProducts