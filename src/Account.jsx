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
import DeleteAddressConfirmation from './Components/DeleteAddressConfirmation'
import Alert from './Components/Alert'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import ReviewForm from './Components/ReviewForm'
import updateReview from './scripts/Review/updateReview'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import getUserAddresses from './scripts/Address/getUserAddresses'
import AddressInfo from './Components/AddressInfo'
import getUserOrders from './scripts/User/getUserOrders'
import OrderInfo from './Components/OrderInfo'
import OrderDetails from './Components/OrderDetails'
import Pagination from './Components/Pagination'

function Account() {
  const [reviews, setReviews] = useState(null)
  const [userProducts, setUserProducts] = useState(null)
  const [addresses, setAddresses] = useState(null)
  const [orders, setOrders] = useState(null)

  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [loadingAddresses, setLoadingAddresses] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(true)

  const [selectedView, setSelectedView] = useState('Orders')

  const [showDeleteProductConfirmation, setShowDeleteProductConfirmation] = useState(false)
  const [showDeleteReviewConfirmation, setShowDeleteReviewConfirmation] = useState(false)
  const [showDeleteAddressConfirmation, setShowDeleteAddressConfirmation] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [alertDetails, setAlertDetails] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  const [productId, setProductId] = useState(null)
  const [reviewId, setReviewId] = useState(null)
  const [addressId, setAddressId] = useState(null)

  const [isAdmin, setIsAdmin] = useState(false)

  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const [scrollY, setScrollY] = useState(0)

  const onPageChange = async (selectedPage) => {
    let pageSize = 6
    const data = await getUserProducts(cookies.token, selectedPage, pageSize)
    setUserProducts(data)
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (!cookies.token) {
      return navigate('/signin')
    }

    getUserProducts(cookies.token)
      .then(data => {
        if (data === 'Forbidden') return
        setIsAdmin(true)
        if (data.products.length > 0) setUserProducts(data)
      })
      .finally(() => setLoadingProducts(false))

    getUserReviews(cookies.token)
      .then(reviews => {
        if (reviews.length > 0) setReviews(reviews)
      })
      .finally(() => setLoadingReviews(false))

    getUserAddresses(cookies.token)
      .then(addresses => {
        if (addresses.length > 0) setAddresses(addresses)
      })
      .finally(() => setLoadingAddresses(false))

    getUserOrders(cookies.token)
      .then(orders => {
        if (orders.length > 0) setOrders(orders)
      })
      .finally(() => setLoadingOrders(false))

  }, [cookies.token, navigate])

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

        {showDeleteAddressConfirmation &&
          <DeleteAddressConfirmation
            addressId={addressId}
            addresses={addresses}
            setAddresses={setAddresses}
            setShowDeleteAddressConfirmation={setShowDeleteAddressConfirmation}
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

        {
          showOrderDetails &&
          <OrderDetails
            orderId={orderId}
            setShowOrderDetails={setShowOrderDetails}
            scrollY={scrollY}
          />
        }

        <div className='mx-auto w-11/12 mt-8 z-0'>

          <div className='flex justify-center'>
            <AccountTab name={'Orders'} selectedView={selectedView} setSelectedView={setSelectedView} />
            <AccountTab name={'Addresses'} selectedView={selectedView} setSelectedView={setSelectedView} />
            {
              isAdmin && <AccountTab name={'Products'} selectedView={selectedView} setSelectedView={setSelectedView} />
            }
            <AccountTab name={'Reviews'} selectedView={selectedView} setSelectedView={setSelectedView} />
          </div>

          {selectedView === 'Orders' &&
            <div className='mt-3'>
              {loadingOrders ? (
                <div className='flex justify-center items-center'>
                  <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-red-600'></div>
                </div>
              ) : (
                orders ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3'>
                    {orders.map(order => (
                      <div key={order.id} className='flex flex-col items-center border rounded-md p-2 my-2'>
                        <OrderInfo order={order} />
                        <span
                          onClick={() => {
                            setOrderId(order.id)
                            setShowOrderDetails(true)
                            setScrollY(window.scrollY)
                          }}
                          className='text-red-600 underline'
                        >
                          See details...
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='flex flex-col items-center mt-8'>
                    <ExclamationTriangleIcon className='size-16 text-red-600' />
                    <span className='font-bold text-xl text-slate-400'>No orders available...</span>
                  </div>
                )
              )}
            </div>
          }

          {selectedView === 'Addresses' &&
            <div className='flex flex-col items-center mb-3'>
              <button
                className=' w-1/2 md:w-1/6 p-1 my-2 border-2 rounded-md text-slate-400  hover:text-white font-bold border-slate-300 bg-slate-100 hover:bg-red-600 hover:border-red-700'
                onClick={() => navigate(`/address/add`)}
              >
                Add Address
              </button>
              {loadingAddresses ? (
                <div className='flex justify-center items-center'>
                  <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-red-600'></div>
                </div>
              ) : (
                addresses ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {addresses.map(address => (
                      <AddressInfo
                        key={address.id}
                        address={address}
                        setAddressId={setAddressId}
                        setShowDeleteAddressConfirmation={setShowDeleteAddressConfirmation}
                        setScrollY={setScrollY}
                      />
                    ))}
                  </div>
                ) : (
                  <div className='flex flex-col items-center mt-8'>
                    <ExclamationTriangleIcon className='size-16 text-red-600' />
                    <span className='font-bold text-xl text-slate-400'>No addresses available...</span>
                  </div>
                )
              )}
            </div>
          }

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
              {loadingProducts ? (
                <div className='flex justify-center items-center'>
                  <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-red-600'></div>
                </div>
              ) : (
                userProducts ? (
                  <div className='flex flex-wrap justify-center gap-3'>
                    {userProducts.products.map(product => (
                      <ProductManagement
                        key={product.id}
                        product={product}
                        setDeleteProductId={setProductId}
                        setShowDeleteProductConfirmation={setShowDeleteProductConfirmation}
                        setScrollY={setScrollY}
                      />
                    ))}
                    <Pagination paginationInfo={userProducts.pagination} onPageChange={onPageChange} />
                  </div>
                ) : (
                  <div className='flex flex-col items-center mt-8 h-full'>
                    <ExclamationTriangleIcon className='size-16 text-red-600' />
                    <span className='font-bold text-xl text-slate-400'>No products available...</span>
                  </div>
                )
              )}
            </div>
          }

          {selectedView === 'Reviews' &&
            <div className='mb-3'>
              {loadingReviews ? (
                <div className='flex justify-center items-center'>
                  <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-red-600'></div>
                </div>
              ) : (
                reviews ? (
                  <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {reviews.map(review => (
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
                    ))}
                  </div>
                ) : (
                  <div className='flex flex-col items-center mt-8'>
                    <ExclamationTriangleIcon className='size-16 text-red-600' />
                    <span className='font-bold text-xl Text-slate-400'>No reviews available...</span>
                  </div>
                )
              )}
            </div>
          }

        </div>
      </div>

    </div>
  )
}

export default Account