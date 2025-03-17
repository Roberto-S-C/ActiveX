async function getAddress(id, token) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/address/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    const address = await response.json()
    return address
}

export default getAddress