async function createReview(data, starsValue, productId, token, setAlertDetails, setShowAlert, setProduct) {
    let review = {
        title: data.title,
        content: data.content,
        stars: starsValue,
        productId
    }
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })  
    if(response.ok) {
        let data = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`)
        let product = await data.json()
        setProduct(product)
        setAlertDetails({ status: 'success', message: 'Review added successfully', duration: 2000 })
        setShowAlert(true)
    }
    else {
        setAlertDetails({ status: 'error', message: 'Error adding review', duration: 2000 })
        setShowAlert(true)
    }

}

export default createReview