import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import './Styles/index.css'
import App from './App.jsx'
import Navbar from './Components/Navbar.jsx'
import ProductRoute from './ProductRoute.jsx'
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';
import Account from './Account.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes >
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="account" element={<Account/>} />

        <Route element={<Navbar />} >
          <Route index element={<App />} />
          <Route path='products'>
            <Route path=':id' element={<ProductRoute />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode >
)
