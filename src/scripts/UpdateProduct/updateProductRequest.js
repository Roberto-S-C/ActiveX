function updateProductRequest(data, model, selectedCategory, price, setShowAlert, setAlertDetails, token, navigate, productId, remote) {

    if (!model) {
        setAlertDetails({ status: 'error', message: 'Select a file', duration: 3000 })
        setShowAlert(true)
        return
    }
    if (selectedCategory === 0) {
        setAlertDetails({ status: 'error', message: 'Select a category', duration: 3000 })
        setShowAlert(true)
        return
    }

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', price)
    formData.append('categoryId', selectedCategory)

    if (!remote) {
        formData.append('file3DModel', model, model.name)
    }

    try {
        fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(() => navigate(`/products/${productId}`))
            .catch(e => console.log(e))
    } catch (error) {
        console.error(error);
    }

}

export default updateProductRequest