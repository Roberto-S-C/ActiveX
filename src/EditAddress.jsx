import React, { useState } from 'react'
import Header from './Components/Header'
import AddressForm from './Components/AddressForm'
import updateAddress from './scripts/Address/updateAddress'
import Alert from './Components/Alert'

function EditAddress() {

  const [alertDetails, setAlertDetails] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  return (
    <div>
      <Header title='Edit Address' />
      {showAlert && <Alert alertDetails={alertDetails} setShowAlert={setShowAlert} positionY={10} />}
      <div className='flex items-center h-screen'>
        <AddressForm onSubmit={updateAddress} setAlertDetails={setAlertDetails} setShowAlert={setShowAlert} />
      </div>
    </div>
  )
}

export default EditAddress