const getCategories = async () => {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
    let data = await response.json()
    data.unshift({ id: 0, name: 'Categories' })
    return data.map(category => {
        return { value: category.id, label: <span className='text-red-600 font-bold'>{category.name}</span> }
    })
}

export default getCategories