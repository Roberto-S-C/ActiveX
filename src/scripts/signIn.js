export default async function signIn(data) {
    let respone = await fetch(`${import.meta.env.VITE_API_URL}/api/account/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    let token = await respone.text()
    return token 
}