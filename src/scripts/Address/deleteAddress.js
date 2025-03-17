async function deleteAddress(token, id, setAlertDetails, setShowAlert, addresses, setAddresses) {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/address/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 204) {
        setAlertDetails({
            status: 'success',
            message: 'Address deleted successfully',
            duration: 3000
        })
        setAddresses(addresses.filter(address=> address.id !== id))
        setShowAlert(true)
    } else {
        setAlertDetails({
            status: 'error',
            message: 'Error deleting address',
            duration: 3000
        })
        setShowAlert(true)
    }
}

export default deleteAddress