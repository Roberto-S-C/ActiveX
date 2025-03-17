async function updateAddress(data, selectedCountry, selectedState, selectedCity, token, navigate, setAlertDetails, setShowAlert, addressId) {
    let address = {
        fullName: data.fullName,
        street: data.street,
        number: data.number,
        city: selectedCity.label,
        state: selectedState.label,
        postalCode: data.postalCode,
        country: selectedCountry.label,
        phone: data.phone
    }
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/address/${addressId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
    })
    if (response.ok) {
        setAlertDetails({status: 'success', message: 'Address updated successfully', duration: 3000})
        setShowAlert(true)
        return setTimeout(() => navigate('/account'), 1200)
    }
    setAlertDetails({status: 'error', message: 'Address could not be updated', duration: 3000})
    setShowAlert(true)
}

export default updateAddress