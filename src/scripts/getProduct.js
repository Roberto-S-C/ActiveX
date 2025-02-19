async function getProduct(id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
    if(response.ok) return await response.json() 
    return null
}

export default getProduct