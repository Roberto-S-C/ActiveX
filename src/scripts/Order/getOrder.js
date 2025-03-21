async function getOrder(orderId, token) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order/${orderId}`, {
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

export default getOrder