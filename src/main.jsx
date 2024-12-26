import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './Styles/index.css'
import App from './App.jsx'
import ProductRoute from './ProductRoute.jsx';
import Navbar from './components/Navbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<ProductRoute />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
