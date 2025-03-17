import { StrictMode, createContext, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import './Styles/index.css'
import App from './App.jsx'
import Navbar from './Components/Navbar.jsx'
import ProductRoute from './ProductRoute.jsx'
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';
import Account from './Account.jsx';
import ShoppingBag from './ShoppingBag.jsx'
import AddProduct from './AddProduct.jsx'
import EditProduct from './EditProduct.jsx'
import getProducts from './scripts/Product/getProducts.js'
import NotFound from './NotFound.jsx'
import Header from './Components/Header.jsx'
import Success from './Success.jsx'
import Cancelled from './Cancelled.jsx'
import AddAddress from './AddAddress.jsx'
import EditAddress from './EditAddress.jsx'

export const ProductListContext = createContext();

function Main() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts()
      .then(data => setProductList(data))
  }, [])

  return (
    <ProductListContext.Provider value={{ productList, setProductList }}>
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="account" element={<Account />} />
          <Route path="shoppingbag" element={<ShoppingBag />} />

          <Route path='products'>
            <Route element={<Navbar />} >
              <Route index element={<App />} />
              <Route path=':id' element={<ProductRoute />} />
            </Route>
            <Route path='add' element={<AddProduct />} />
            <Route path='edit/:id' element={<EditProduct />} />
          </Route>

          <Route path='checkout' element={<Header title={'Checkout'} />}>
            <Route path='success' element={<Success />} />
            <Route path='canceled' element={<Cancelled />} />
          </Route>

          <Route path='address/add' element={<AddAddress />} />
          <Route path='address/update/:id' element={<EditAddress />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ProductListContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Main />
  // </StrictMode>
)
