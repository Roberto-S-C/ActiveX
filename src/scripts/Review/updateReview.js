import getUserReviews from "../User/getUserReviews"

async function updateReview(fields, alert, token, stateFunction, setShowReviewForm) {
    if (fields.stars < 0 || fields.stars > 5) {
        alert.setAlertDetails({
            status: 'error',
            message: 'Please select a valid number of stars',
            duration: 3000
        })
        alert.setShowAlert(true)
        return
    }
    let review = {
        title: fields.title,
        content: fields.content,
        stars: fields.stars,
    }
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${fields.id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        let reviews = await getUserReviews(token)
        stateFunction(reviews) 
        alert.setAlertDetails({
            status: 'success',
            message: 'Review updated successfully',
            duration: 3000
        })
        alert.setShowAlert(true)
    } else {
        alert.setAlertDetails({
            status: 'error',
            message: 'Error updating review',
            duration: 3000
        })
        alert.setShowAlert(true)
    }
    setShowReviewForm(false)
}

export default updateReview