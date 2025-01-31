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

export const ProductListContext = createContext();

function Main() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(response => response.json())
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
          <Route element={<Navbar />} >
            <Route index element={<App />} />
            <Route path='products'>
              <Route path=':id' element={<ProductRoute />} />
              <Route path='add' element={<AddProduct />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
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
