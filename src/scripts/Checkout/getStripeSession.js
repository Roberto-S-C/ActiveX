async function getStripeSession(sessionId, token) {
    try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/stripe/session/${sessionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let data = await response.json()
        return data 
    } catch (e) {
        console.log(e)
    }
}

export default getStripeSession