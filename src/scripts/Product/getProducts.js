async function getProducts() {
    return fetch(`${import.meta.env.VITE_API_URL}/api/products`)
        .then(response => response.json())
        .catch(error => null)
}

export default getProducts