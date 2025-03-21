async function getUserOrders(token) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if (!response.ok) {
        return null
    }
    return await response.json()
}

export default getUserOrders