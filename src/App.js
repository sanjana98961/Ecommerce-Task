import logo from './logo.svg';
import './App.css';
import ProductListing from './COMPONENTS/Pages/Home';
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductDetail from './COMPONENTS/Pages/ProductDetail';
import CartPage from './COMPONENTS/Pages/Cart';
import { CartProvider } from './COMPONENTS/CartContext';
import { AnimatePresence } from "framer-motion";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<ProductListing/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>
      </Router>
    </CartProvider>
    
  );
}

export default App;
