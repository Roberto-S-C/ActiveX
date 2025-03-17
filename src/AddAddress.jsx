import React, { useState } from 'react'
import Header from './Components/Header'
import AddressForm from './Components/AddressForm'
import createAddres from './scripts/Address/createAddress'
import Alert from './Components/Alert'

function AddAddress() {

  const [alertDetails, setAlertDetails] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  return (
    <div>
      <Header title='Add Address' />
      {showAlert && <Alert alertDetails={alertDetails} setShowAlert={setShowAlert} positionY={10} />}
      <div className='flex items-center h-screen'>
        <AddressForm onSubmit={createAddres} setAlertDetails={setAlertDetails} setShowAlert={setShowAlert} />
      </div>
    </div>
  )
}

export default AddAddress