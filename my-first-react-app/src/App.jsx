import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './Components/Header'
import Shop from '../src/Pages/Shop'
import Men from '../src/Pages/Men'
import Women from './Pages/Women';
import Kids from '../src/Pages/Kids'
import Cart from './Pages/Cart';
import Footer from './Components/Footer';
import LoginSignup from './Pages/LoginSignup';
import ShopContextProvider from './Context/ShopContext';
import Product from './Pages/Product';


import AddProduct from './Admin/AddProduct'; 
import Checkout from './Components/Checkout';

const App = () =>{

    return(
        <ShopContextProvider> 
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Shop />} />
                    <Route path="/men" element={<Men />}/>
                    <Route path="/women" element={<Women />}/>
                    <Route path="/kids" element={<Kids />}/>
                    <Route path="/login" element={<LoginSignup />}/>
                    <Route path="/cart" element={<Cart />}/>
                    <Route path="/product/:productId" element={<Product />} />
                    
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path="/admin-add" element={<AddProduct />} />
                </Routes>
                <Footer />
            </Router>
        </ShopContextProvider>
    );
}

export default App;