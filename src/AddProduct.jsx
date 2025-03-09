import React, { useState, useEffect } from 'react'
import Header from './Components/Header'
import AddCategory from './Components/AddCategory'
import Alert from './Components/Alert'
import createProductRequest from './scripts/Product/createProductRequest'
import { useCookies } from 'react-cookie'
import ProductForm from './Components/ProductForm'
import { useNavigate } from 'react-router'

function AddProduct() {
  const [showCategoryModal, setShowCategoryModal] = useState(false)

  const [showAlert, setShowAlert] = useState(false)
  const [alertDetails, setAlertDetails] = useState({})

  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [token, setToken] = useState(null)
   
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.token) {
      return navigate("/signin")
    }
    setToken(cookies.token)
  }, [])

  return (
    <div className='relative'>
      <Header title={'Create Product'} />

      {showAlert && <Alert alertDetails={alertDetails} setShowAlert={setShowAlert} />}

      {showCategoryModal &&
        <div className='absolute flex justify-center items-center top-0 left-0 w-full h-full z-10 bg-slate-200 bg-opacity-80'>
          <AddCategory setShowCategoryModal={setShowCategoryModal} />
        </div>
      }

      <ProductForm
        onSubmit={createProductRequest}
        showCategoryModal={showCategoryModal}
        setShowCategoryModal={setShowCategoryModal}
        setShowAlert={setShowAlert}
        setAlertDetails={setAlertDetails}
        token={token}
      />

    </div>
  )
}
export default AddProduct