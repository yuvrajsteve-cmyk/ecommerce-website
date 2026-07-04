import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Shop from './Pages/Shop'
import Men from './Pages/Men'
import Women from './Pages/Women'
import Kids from './Pages/Kids'
import Cart from './Pages/Cart'
import Footer from './Components/Footer'
import LoginSignup from './Pages/LoginSignup'
import ShopContextProvider from './Context/ShopContext'
import Product from './Pages/Product'
import AddProduct from './Admin/AddProduct'
import Checkout from './Components/Checkout'

const AdminGuard = () => {
  const isAdmin = localStorage.getItem('is_admin_user')

  if (isAdmin !== 'true') {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

const App = () => {
  return (
    <ShopContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<Men />} />
          <Route path='/women' element={<Women />} />
          <Route path='/kids' element={<Kids />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/checkout' element={<Checkout />} />

          <Route element={<AdminGuard />}>
            <Route path='/admin-add' element={<AddProduct />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </ShopContextProvider>
  )
}

export default App
