import React, { useContext } from 'react'
import ProductScene from './ProductScene'
import { Link } from 'react-router'
import { ProductListContext } from '../main'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import Pagination from './Pagination'
import getProducts from '../scripts/Product/getProducts'

function ProductsList({ setLoadingProducts }) {
  const { productList, setProductList } = useContext(ProductListContext)

  const onPageChange = async (selectedPage) => {
    setLoadingProducts(true)
    let productName = ''
    let category = 0
    let pageSize = 6
    getProducts(productName, category, selectedPage, pageSize)
      .then(data => {
        setProductList(data)
        setLoadingProducts(false)
      })
  }

  return (
    productList.products && productList.products.length > 0 ? (
      <div className='container mx-auto flex flex-col items-center'>
        <div className='flex flex-wrap justify-center'>
          {productList.products.map((product) => (
            <div key={product.id} className='mx-2 my-2'>
              <ProductScene model={product.file3DModel} scale={2.0} height={"85%"} background={''} remote={true} />
              <div className='bg-slate-200 hover:cursor-pointer'>
                <Link to={`/products/${product.id}`}>
                  <h2 className='text-xl text-red-600 font-bold px-1'>{product.name}</h2>
                  <p className='font-bold text-slate-600 px-1'>{product.price} $</p>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className='flex justify-center items-center mt-4'>
          <Pagination paginationInfo={productList.pagination} onPageChange={onPageChange} />
        </div>
      </div>
    ) : (
      <div className='flex flex-col items-center justify-center h-screen'>
        <ExclamationTriangleIcon className='size-20 text-red-600' />
        <h3 className='my-3 text-center text-4xl text-slate-400'>Product not found...</h3>
      </div>
    )
  )
}

export default ProductsList