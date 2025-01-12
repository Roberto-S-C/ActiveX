import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './Styles/index.css'
import App from './App.jsx'
import ProductRoute from './ProductRoute.jsx';
import Navbar from './components/Navbar.jsx';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes >
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />

        <Route element={<Navbar />} >
          <Route index element={<App />} />
          <Route path='products'>
            <Route path=':id' element={<ProductRoute />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode >
)
