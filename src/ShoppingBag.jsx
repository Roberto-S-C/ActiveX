import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import ProductScene from './Components/ProductScene'
import { Link } from 'react-router'
import { MinusCircleIcon, PlusCircleIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/solid'

function ShoppingBag() {
    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const getProduct = async (productId) => {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`)
        return await response.json()
    }

    const calculateTotalPrice = () => {
        let total = 0
        products.forEach(product => {
            total += product.price * product.quantity
        })
        setTotalPrice(total)
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
                bag.forEach(item => {
                    getProduct(item.id).then(product => {
                        product.quantity = item.quantity
                        setProducts(prevProducts => [...prevProducts, product])
                    })
                });
            }
        }
    }, [])

    useEffect(() => calculateTotalPrice(), [products])

    return (
        <div>
            <Header title='Shopping Bag' />
            <div className='flex w-4/5 mx-auto h-screen'>
                <div className='w-2/3 mx-3'>
                    <h3 className='mt-3 text-red-600 font-bold text-2xl'>Products</h3>
                    {products.length > 0 ?
                        <div className='flex flex-col h-full'>
                            {products.map(product => (
                                <div key={product.id} className='flex h-1/3 my-2'>
                                    <div className='w-3/4 h-full'>
                                        <ProductScene model={product.file3DModel} scale={1.0} height={"100%"} background={''} />
                                    </div>
                                    <div className='flex flex-col justify-evenly relative w-1/4 bg-slate-200 hover:cursor-pointer'>
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
                <div className=' w-1/3 mx-3'>
                    <h3 className='my-3 text-red-600 font-bold text-2xl text-center'>Summary</h3>
                    <div className='flex flex-col justify-center items-center'>
                        {products.map(product => (
                            <div key={product.id} className='flex justify-between my-2 w-2/3'>
                                <span>{product.quantity} X {product.name}</span>
                                <span>{product.price * product.quantity} $</span>
                            </div>
                        ))}
                        <div className='flex justify-between w-2/3 mt-5'>
                            <span className='font-bold'>Total</span>
                            <span className='font-bold'>{totalPrice} $</span>
                        </div>
                        <button className='w-4/5 mt-5 text-2xl bg-red-600 text-white p-5 rounded-lg hover:bg-red-700 font-bold'>Checkout</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ShoppingBag