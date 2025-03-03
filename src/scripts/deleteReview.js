async function deleteReview(token, id, setAlertDetails, setShowAlert, reviews, setReviews) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 204) {
        setAlertDetails({
            status: 'success',
            message: 'Review deleted successfully',
            duration: 3000
        })
        setReviews(reviews.filter(review => review.id !== id))
        setShowAlert(true)
    } else {
        setAlertDetails({
            status: 'error',
            message: 'Error deleting review',
            duration: 3000
        })
        setShowAlert(true)
    }
}

export default deleteReview