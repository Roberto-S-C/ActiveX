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
import DeleteProductConfirmation from './Components/DeleteProductConfirmation'
import DeleteReviewConfirmation from './Components/DeleteReviewConfirmation'
import Alert from './Components/Alert'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import ReviewForm from './Components/ReviewForm'
import updateReview from './scripts/Review/updateReview'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

function Account() {
  const [reviews, setReviews] = useState(null)
  const [products, setProducts] = useState(null)

  const [selectedView, setSelectedView] = useState('Products')

  const [showDeleteProductConfirmation, setShowDeleteProductConfirmation] = useState(false)
  const [showDeleteReviewConfirmation, setShowDeleteReviewConfirmation] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const [alertDetails, setAlertDetails] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  const [productId, setProductId] = useState(null)
  const [reviewId, setReviewId] = useState(null)

  const [isAdmin, setIsAdmin] = useState(false)

  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const [scrollY, setScrollY] = useState(0)

  const navigate = useNavigate()
  useEffect(() => {
    if (!cookies.token) {
      return navigate('/signin')
    }

    getUserProducts(cookies.token)
      .then(products => {
        if (!products) return
        setIsAdmin(true)
        if (products.length > 0) return setProducts(products)
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
        {showDeleteProductConfirmation &&
          <DeleteProductConfirmation
            deleteProductId={productId}
            products={products}
            setProducts={setProducts}
            setShowDeleteProductConfirmation={setShowDeleteProductConfirmation}
            setAlertDetails={setAlertDetails}
            setShowAlert={setShowAlert}
            scrollY={scrollY}
          />
        }

        {showDeleteReviewConfirmation &&
          <DeleteReviewConfirmation
            reviewId={reviewId}
            reviews={reviews}
            setReviews={setReviews}
            setShowDeleteReviewConfirmation={setShowDeleteReviewConfirmation}
            setAlertDetails={setAlertDetails}
            setShowAlert={setShowAlert}
            scrollY={scrollY}
          />
        }

        {showReviewForm &&
          <ReviewForm
            setShowReviewForm={setShowReviewForm}
            setAlertDetails={setAlertDetails}
            setShowAlert={setShowAlert}
            onSubmit={updateReview}
            stateFunction={setReviews}
            itemId={reviewId}
            scrollY={scrollY}
          />
        }

        <div className='mx-auto w-11/12 mt-8 z-0'>

          <div className='flex justify-center'>
            <AccountTab name={'Products'} selectedView={selectedView} setSelectedView={setSelectedView} />
            <AccountTab name={'Reviews'} selectedView={selectedView} setSelectedView={setSelectedView} />
          </div>

          {selectedView === 'Products' &&
            <div className='flex flex-col items-center mb-2'>
              {isAdmin &&
                  <button
                    className=' w-1/2 md:w-1/6 p-1 my-2 border-2 rounded-md text-slate-400  hover:text-white font-bold border-slate-300 bg-slate-100 hover:bg-red-600 hover:border-red-700'
                    onClick={() => navigate(`/products/add`)}
                  >
                    Add Product
                  </button>
              }
              {products
                ? (
                  <div className='flex flex-wrap justify-center gap-3'>
                    {products.map(product => <ProductManagement
                      key={product.id}
                      product={product}
                      setDeleteProductId={setProductId}
                      setShowDeleteProductConfirmation={setShowDeleteProductConfirmation}
                      setScrollY={setScrollY}
                    />)}
                  </div>
                )
                : (
                  <div className='flex flex-col items-center mt-8 h-full'>
                    <ExclamationTriangleIcon className='size-16 text-red-600' />
                    <span className='font-bold text-xl text-slate-400'>No products available...</span>
                  </div>
                )
              }
            </div>

          }

          {selectedView === 'Reviews' &&
            <div className='mb-3'>
              {reviews
                ? (
                  <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {reviews.map(review =>
                      <div key={review.id} className='flex flex-col justify-between flex-1 border rounded-md p-2'>
                        <Review review={review} />
                        <div className='flex justify-around mt-2'>
                          <button onClick={() => {
                            setShowReviewForm(true)
                            setReviewId(review.id)
                            setScrollY(window.scrollY)
                          }}>
                            <PencilSquareIcon className='w-6 h-6 text-slate-300 hover:text-red-600 hover:cursor-pointer' />
                          </button>
                          <button onClick={() => {
                            setShowDeleteReviewConfirmation(true)
                            setReviewId(review.id)
                            setScrollY(window.scrollY)
                          }}>
                            <TrashIcon className='w-6 h-6 text-slate-300 hover:text-red-600 hover:cursor-pointer' />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
                : (
                  <div className='flex flex-col items-center mt-8'>
                    <ExclamationTriangleIcon className='size-16 text-red-600' />
                    <span className='font-bold text-xl text-slate-400'>No reviews available...</span>
                  </div>
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