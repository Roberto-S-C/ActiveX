async function createOrder(orderDetails, token) {
    try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/order`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        if(!response.ok) {
           return null 
        }
        return  await response.json()
    }
    catch (e) {
        console.log(e)
    }
}

export default createOrder