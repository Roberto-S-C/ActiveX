async function checkout(products, token, navigate) {
    if(!token) return navigate('/signin')
    products = products.map(product => {
        return ({
            stripePriceId: product.stripePriceId,
            quantity: product.quantity
        })
    })
    try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        })
        let data = await response.json()
        if (data.url) {
            window.location.href = data.url;
        } else {
            console.error("Stripe session URL not received");
        }
    } catch (e) {
        console.log(e)
    }

}

export default checkout