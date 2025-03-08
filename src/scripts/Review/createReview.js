async function createReview(fields, alert, token, stateFunction, setShowReviewForm) {
    let review = {
        title: fields.title,
        content: fields.content,
        stars: fields.stars,
        productId: fields.id
    }
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        let data = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${fields.id}`)
        let product = await data.json()
        stateFunction(product)
        alert.setAlertDetails({ status: 'success', message: 'Review added successfully', duration: 2000 })
        alert.setShowAlert(true)
    }
    else {
        setShowReviewForm(false)
        setAlertDetails({ status: 'error', message: 'Error adding review', duration: 2000 })
        setShowAlert(true)
    }
    setShowReviewForm(false)
}

export default createReview