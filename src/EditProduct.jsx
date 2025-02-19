import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import { useNavigate, useParams } from 'react-router'
import { useCookies } from 'react-cookie'
import getProduct from './scripts/getProduct'
import ProductForm from './Components/ProductForm'
import updateProductRequest from './scripts/UpdateProduct/updateProductRequest'

function EditProduct() {
  const params = useParams()

  const [showCategoryModal, setShowCategoryModal] = useState(false)

  const [showAlert, setShowAlert] = useState(false)
  const [alertDetails, setAlertDetails] = useState({})

  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [token, setToken] = useState(null)

  const [product, setProduct] = useState()
  const [remote, setRemote] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    getProduct(params.id)
      .then(product => setProduct(product))
  }, [])

  useEffect(() => {
    if (!cookies.token) {
      return navigate("/signin")
    }
    setToken(cookies.token)
  }, [])


  return (
    <div className='relative'>
      <Header title={'Edit Product'} />

      {showAlert && <Alert alertDetails={alertDetails} setShowAlert={setShowAlert} />}

      {showCategoryModal &&
        <div className='absolute top-0 left-0 w-full h-full z-10 bg-slate-200 bg-opacity-80 flex justify-center items-center'>
          <AddCategory setShowCategoryModal={setShowCategoryModal} />
        </div>
      }

      {product &&
        <ProductForm
          onSubmit={updateProductRequest}
          showCategoryModal={showCategoryModal}
          setShowCategoryModal={setShowCategoryModal}
          setShowAlert={setShowAlert}
          setAlertDetails={setAlertDetails}
          token={token}
          product={product}
          remote={remote}
          setRemote={setRemote}
        />
      }

    </div>
  )
}

export default EditProduct