import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'
import Review from './Components/Review'
import Header from './Components/Header'
import UserInfo from './Components/UserInfo'
import getUserReviews from './scripts/User/getUserReviews'
import getUserProducts from './scripts/User/getUserProducts'
import AccountTab from './Components/AccountTab'
import ProductManagement from './Components/ProductManagement'
import DeleteConfirmation from './Components/DeleteConfirmation'
import Alert from './Components/Alert'

function Account() {
  const [reviews, setReviews] = useState(null)
  const [products, setProducts] = useState(null)
  const [selectedView, setSelectedView] = useState('Products')
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [alertDetails, setAlertDetails] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  const [deleteProductId, setDeleteProductId] = useState(null)

  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const [scrollY, setScrollY] = useState(0)

  const navigate = useNavigate()
  useEffect(() => {
    if (!cookies.token) {
      return navigate('/signin')
    }

    getUserProducts(cookies.token)
      .then(products => {
        if (products.length > 0) return setProducts(products)
        return setProducts(null)
      })

    getUserReviews(cookies.token)
      .then(reviews => {
        if (reviews.length > 0) return setReviews(reviews)
        return setReviews(null)
      })

  }, [])

  return (
    <div>
      <Header title='Account' />

      {showAlert && <Alert alertDetails={alertDetails} setShowAlert={setShowAlert} positionY={scrollY} />}


      <div className='relative flex flex-col items-center'>
        <UserInfo />
        {showDeleteConfirmation &&
          <DeleteConfirmation
            deleteProductId={deleteProductId}
            products={products}
            setProducts={setProducts}
            setShowDeleteConfirmation={setShowDeleteConfirmation}
            setAlertDetails={setAlertDetails}
            setShowAlert={setShowAlert}
            scrollY={scrollY}
          />
        }

        <div className='mx-auto w-11/12 mt-8 z-0'>

          <div className='flex justify-center'>
            <AccountTab name={'Products'} selectedView={selectedView} setSelectedView={setSelectedView} />
            <AccountTab name={'Reviews'} selectedView={selectedView} setSelectedView={setSelectedView} />
          </div>

          {selectedView === 'Products' &&
            <div>
              {products
                ? (
                  <div className='flex flex-wrap justify-center gap-3'>
                    {products.map(product => <ProductManagement
                      key={product.id}
                      product={product}
                      setDeleteProductId={setDeleteProductId}
                      setShowDeleteConfirmation={setShowDeleteConfirmation}
                      setScrollY={setScrollY}
                    />)}
                  </div>
                )
                : (
                  <div>No products available...</div>
                )
              }
            </div>

          }

          {selectedView === 'Reviews' &&
            <div>
              {reviews
                ? (
                  <div>
                    {reviews.map(review => <Review key={review.id} review={review} />)}
                  </div>
                )
                : (
                  <div>No reviews available...</div>
                )
              }
            </div>
          }

        </div>
      </div>

    </div>
  )
}

export default Account