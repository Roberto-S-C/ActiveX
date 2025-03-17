import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import AddressForm from './Components/AddressForm'
import updateAddress from './scripts/Address/updateAddress'
import Alert from './Components/Alert'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'
import getAddress from './scripts/Address/getAddress'
import { useParams } from 'react-router'

function EditAddress() {

  const [alertDetails, setAlertDetails] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  const [address, setAddress] = useState(null)
  const [cookies, setCookies, remove] = useCookies(['token'])
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (!cookies.token) {
      return navigate('/signin')
    }

    getAddress(id, cookies.token)
      .then(address => {
        if (!address) return
        return setAddress(address) 
      })

  }, [])


  return (
    <div>
      <Header title='Edit Address' />
      {showAlert && <Alert alertDetails={alertDetails} setShowAlert={setShowAlert} positionY={10} />}
      <div className='flex items-center h-screen'>
        <AddressForm onSubmit={updateAddress} setAlertDetails={setAlertDetails} setShowAlert={setShowAlert} address={address} />
      </div>
    </div>
  )
}

export default EditAddress