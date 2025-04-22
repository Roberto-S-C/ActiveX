import './Styles/App.css'
import ProductsList from './Components/ProductsList'
import { BeatLoader } from 'react-spinners'

function App({ loadingProducts, setLoadingProducts }) {

  return (
    <div>
      {loadingProducts && (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="#dc2626" size={30} />
        </div>
      )}
      {!loadingProducts && (
        <div>
          <ProductsList setLoadingProducts={setLoadingProducts} />
        </div>
      )}
    </div>
  )
}

export default App
