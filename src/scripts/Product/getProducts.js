async function getProducts(productName = '', category = 0, pageNumber = 1, pageSize = 6) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/products?name=${productName}&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then(response => response.json())
        .catch(error => null)
}

export default getProducts