async function createOrderItem(orderItem, token) {
    try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/orderItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(orderItem)
        })
        if(!response.ok) {
            return null 
        }
        return await response.json()
    }
    catch (e) {
        console.log(e)
    }
}

export default createOrderItem