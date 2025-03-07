async function deleteProduct(token, id, setAlertDetails, setShowAlert, products, setProducts) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 204) {
        setAlertDetails({
            status: 'success',
            message: 'Product deleted successfully',
            duration: 3000
        })
        setProducts(products.filter(product => product.id !== id))
        setShowAlert(true)
    } else {
        setAlertDetails({
            status: 'error',
            message: 'Error deleting product',
            duration: 3000
        })
        setShowAlert(true)
    }
}

export default deleteProduct