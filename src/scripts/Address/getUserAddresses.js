async function getUserAddresses(token) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/addresses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }    
    })

    const addresses = await response.json()
    return addresses
}

export default getUserAddresses