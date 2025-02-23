async function getUserProducts(token) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/products`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
}

export default getUserProducts