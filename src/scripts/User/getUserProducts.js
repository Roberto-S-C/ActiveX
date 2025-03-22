async function getUserProducts(token, pageNumber = 1, pageSize = 6) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/products?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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