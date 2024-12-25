import './App.css'
import Navbar from './components/Navbar'
import Product from './Components/Product'
import ProductsList from './Components/ProductsList'

function App() {

  return (
    <div className='relative'>
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>
      <ProductsList />
      {/* <Product /> */}
    </div>
  )
}

export default App
