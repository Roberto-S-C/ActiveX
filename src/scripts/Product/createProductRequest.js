function createProductRequest(data, model, selectedCategory, price, setShowAlert, setAlertDetails, token, navigate) {

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
    formData.append('file3DModel', model, model.name)
    formData.append('categoryId', selectedCategory)

    try {
        fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then((response) => response.json())
            .then(data => navigate(`/products/${data.id}`))
            .catch(e => console.log(e))
    } catch (error) {
        console.error(error);
    }
}

export default createProductRequest