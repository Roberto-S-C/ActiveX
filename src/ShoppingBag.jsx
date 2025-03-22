import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import ProductScene from './Components/ProductScene'
import { Link } from 'react-router'
import { MinusCircleIcon, PlusCircleIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/solid'
import getProduct from './scripts/Product/getProduct'
import CheckoutAddress from './Components/CheckoutAddress'
import Alert from './Components/Alert'

function ShoppingBag() {
    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [showCheckoutAddress, setShowCheckoutAddress] = useState(false)
    const [loading, setLoading] = useState(true) // Add loading state

    const [alertDetails, setAlertDetails] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [positionY, setPositionY] = useState(null)

    const calculateTotalPrice = () => {
        let total = 0
        products.forEach(product => {
            total += product.price * product.quantity
        })
        setTotalPrice(Math.round(total * 100) / 100)
    }

    const setItemQuantity = (id, operand) => {
        let newProducts = products.map(product => {
            if (product.id == id) {
                if (operand === -1 && product.quantity === 1) {
                    return null
                }
                product.quantity += operand
            }
            return product
        })
        newProducts = newProducts.filter(product => product !== null)
        setProducts(newProducts)
        localStorage.setItem('bag', JSON.stringify(newProducts))
    }

    useEffect(() => {
        let bag = localStorage.getItem('bag')
        if (bag) {
            bag = JSON.parse(bag)
            if (products.length === 0) {
                Promise.all(
                    bag.map(item =>
                        getProduct(item.id)
                            .then(product => {
                                product.quantity = item.quantity
                                setProducts(prevProducts => [...prevProducts, product])
                            })
                            .catch(() => {
                                let newBag = bag.filter(bagItem => bagItem.id != item.id)
                                localStorage.setItem('bag', JSON.stringify(newBag))
                                setProducts(prevProducts => prevProducts.filter(product => product.id !== item.id))
                            })
                    )
                ).finally(() => setLoading(false)) // Set loading to false after all requests are completed
            } else {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [])

    useEffect(() => calculateTotalPrice(), [products])

    return (
        <div className='relative z-0'>
            <Header title='Shopping Bag' />
            {showAlert && <Alert alertDetails={alertDetails} setShowAlert={setShowAlert} positionY={positionY} />}
            {showCheckoutAddress && <CheckoutAddress products={products} setShowCheckoutAddress={setShowCheckoutAddress} />}
            {loading ? (
                // Show spinner while loading
                <div className='flex justify-center items-center h-screen'>
                    <div className='spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-red-600'></div>
                </div>
            ) : (
                <div className='flex flex-col lg:flex-row container mx-auto h-screen'>
                    <div className='lg:w-2/3 lg:mx-3'>
                        <h3 className='mt-3 text-center lg:text-left text-red-600 font-bold text-3xl'>Products</h3>
                        {products.length > 0 ?
                            <div className='flex flex-col items-center h-full'>
                                {products.map(product => (
                                    <div key={product.id} className='flex flex-col items-center md:w-2/3 lg:w-full lg:flex-row lg:h-1/3 my-2'>
                                        <div className='w-full lg:w-3/4 h-full'>
                                            <ProductScene model={product.file3DModel} scale={2.2} height={"100%"} background={''} remote={true} />
                                        </div>
                                        <div className='flex flex-col justify-evenly relative w-full h-full lg:w-1/4 bg-slate-200 hover:cursor-pointer'>
                                            <Link to={`/products/${product.id}`}>
                                                <h2 className='text-xl text-center text-red-600 font-bold underline'>{product.name}</h2>
                                            </Link>
                                            <div className='flex justify-center items-center'>
                                                {product.quantity > 1 ?
                                                    <button onClick={() => setItemQuantity(product.id, -1)} className='mx-2'><MinusCircleIcon className='size-8 text-slate-400 hover:text-slate-600' /></button>
                                                    : <button onClick={() => setItemQuantity(product.id, -1)} className='mx-2'><TrashIcon className='size-8 text-slate-400 hover:text-slate-600' /></button>
                                                }
                                                <p className='font-bold text-lg'>{product.quantity}</p>
                                                <button onClick={() => setItemQuantity(product.id, 1)} className='mx-2'><PlusCircleIcon className='size-8 text-slate-400 hover:text-slate-600' /></button>
                                            </div>
                                            <p className='font-bold text-center'>{product.price * product.quantity} $</p>
                                        </div>
                                    </div>
                                ))}
                            </div> :
                            <div>
                                <ShoppingBagIcon className='mx-auto my-10 size-16 text-slate-200' />
                                <h3 className='text-center'>There are no products in your bag...</h3>
                            </div>}
                    </div>
                    <div className='w-full lg:w-1/3 lg:mx-3'>
                        <h3 className='my-3 text-red-600 font-bold text-3xl text-center'>Summary</h3>
                        <div className='flex flex-col justify-center items-center'>
                            {products.map(product => (
                                <div key={product.id} className='flex justify-between my-2 w-2/3'>
                                    <span className='w-1/2'>{product.quantity} X {product.name}</span>
                                    <span className='text-right w-1/2'>{product.price * product.quantity} $</span>
                                </div>
                            ))}
                            <div className='flex justify-between w-2/3 mt-5'>
                                <span className='text-xl font-bold'>Total</span>
                                <span className='text-xl font-bold'>{totalPrice} $</span>
                            </div>
                            <button
                                onClick={() => {
                                    if (products.length === 0) {
                                        setAlertDetails({
                                            status: 'error',
                                            message: 'Your bag is empty.',
                                            duration: 1000
                                        })
                                        setShowAlert(true)
                                        setPositionY(window.scrollY + 10)
                                        return
                                    }
                                    setShowCheckoutAddress(true)
                                }}
                                className='w-1/2 md:w-1/3 lg:w-2/3  mt-5 text-2xl bg-red-600 text-white p-3 mb-2 rounded-lg hover:bg-red-700 font-bold'
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShoppingBag