import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import ProductScene from './ProductScene'
import Alert from './Alert.jsx'
import Review from './Review'
import { ShoppingBagIcon } from '@heroicons/react/20/solid'
import getProduct from '../scripts/Product/getProduct.js'
import ReviewForm from './ReviewForm.jsx'
import createReview from '../scripts/Review/createReview.js'
import BeatLoader from 'react-spinners/BeatLoader'

function Product() {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true) // Add loading state
    let { id } = useParams()

    const [showAlert, setShowAlert] = useState(false)
    const [alertDetails, setAlertDetails] = useState({ status: '', message: '', duration: 0 })
    const [showReviewForm, setShowReviewForm] = useState(false)

    const [scrollY, setScrollY] = useState(0)

    const addToBag = () => {
        let bag = localStorage.getItem('bag')
        let duplicatedItem = false
        if (bag) {
            bag = JSON.parse(bag)
            bag.forEach(item => {
                if (item.id == id) {
                    duplicatedItem = true
                    item.quantity += 1
                    localStorage.setItem('bag', JSON.stringify(bag))
                }
            });
            if (!duplicatedItem) {
                bag.push({ id, quantity: 1 })
                localStorage.setItem('bag', JSON.stringify(bag))
            }
        }
        else {
            bag = [{ id, quantity: 1 }]
            localStorage.setItem('bag', JSON.stringify(bag))
        }
        setScrollY(window.scrollY)
        setAlertDetails({ status: 'success', message: 'Product added to bag', duration: 2000 })
        setShowAlert(true)
    }

    useEffect(() => {
        getProduct(id)
            .then(product => {
                setProduct(product)
            })
            .finally(() => setLoading(false)) // Set loading to false after fetching
    }, [id])

    return (
        <div className='relative'>
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <BeatLoader color="#dc2626" size={15} />
                </div>
            ) : (
                <>
                    {showReviewForm &&
                        <ReviewForm
                            setShowReviewForm={setShowReviewForm}
                            setAlertDetails={setAlertDetails}
                            setShowAlert={setShowAlert}
                            onSubmit={createReview}
                            stateFunction={setProduct}
                            itemId={id}
                            scrollY={scrollY}
                        />
                    }
                    {product && (<div className='lg:flex container mx-auto z-0'>
                        {showAlert && <Alert
                            alertDetails={alertDetails}
                            setShowAlert={setShowAlert}
                            positionY={scrollY}
                        />}
                        <div className='lg:w-2/3' style={{ height: '60vh' }}>
                            <ProductScene model={product.file3DModel} scale={2.5} height={'100%'} background={"white"} remote={true} />
                        </div>
                        <div className='lg:w-1/3 flex flex-col justify-between mt-5'>
                            <h1 className='text-center text-4xl text-slate-500 font-bold'>{product.name}</h1>
                            <h3 className='text-2xl text-center text-slate-600 font-bold'>{product.price} $</h3>
                            <div className='w-4/5 mx-auto'>
                                <p className='text-center text-slate-500'>{product.description}</p>
                            </div>
                            <div className='flex justify-center items-center my-3'>
                                <button
                                    onClick={addToBag}
                                    className='flex w-2/3 p-3 justify-center items-center text-2xl font-bold bg-red-600 text-white rounded-lg hover:bg-red-700'
                                >
                                    Add to cart <ShoppingBagIcon className='size-8 ml-2' />
                                </button>
                            </div>
                        </div>
                    </div>
                    )}

                    {product && <div className='container mb-3 z-0 mx-auto'>
                        <h3 className='w-full text-3xl text-red-600 font-bold'>Reviews</h3>
                        <button
                            onClick={() => {
                                setShowReviewForm(true)
                                setScrollY(window.scrollY)
                            }}
                            className='p-1 mt-3 border-2 rounded-md text-slate-400  hover:text-white font-bold border-slate-300 bg-slate-100 hover:bg-red-600 hover:border-red-700'>
                            Add Review
                        </button>
                        {
                            (product.reviews.length > 0) ?
                                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                                    {
                                        product.reviews.map((review) => (
                                            <div key={review.id} className='flex-1 border rounded-md p-2'>
                                                <Review review={review} />
                                            </div>
                                        ))
                                    }
                                </div>
                                : <h1 className='mt-4'>No reviews available...</h1>
                        }
                    </div>}
                </>
            )}
        </div>
    )
}

export default Product