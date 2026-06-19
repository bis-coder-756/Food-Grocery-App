import React from 'react';
// import './App.css'
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import Allproducts from './pages/Allproducts';
import Productcategary from './pages/Productcategary';
import ProductDetail from './pages/ProductDetail';
import Cartpage from './pages/Cartpage';
import Addaddress from './pages/Addaddress';
import Myorders from './pages/Myorders';
import Sellerlogin from './components/Seller/Sellerlogin';
import Sellerlayout from './pages/Sellersection/Sellerlayout';
import Addproduct from './pages/Sellersection/Addproduct';
import Productlist from './pages/Sellersection/Productlist';
import Orders from './pages/Sellersection/Orders';
import Contactus from './pages/Contactus';
import SellerProtectedRoute from './Routes/SellerProtectedRoute';
import Loading from './components/Loading';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';



function App() {

  const isSellerPath = useLocation().pathname.includes('seller')
  const { showUserLogin, isSeller } = useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {/* // DO NOT SHOW NAVBAR ON SELLER PATH // */}
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster
        position="top-center"
      />

      <div className={`${isSellerPath ? "" : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contactus />} />
          <Route path='/products' element={<Allproducts />} />
          <Route path='/products/:category' element={<Productcategary />} />
          <Route path='/products/:category/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cartpage />} />
          <Route path='/add-dddress' element={<Addaddress />} />
          <Route path='/my-orders' element={<Myorders />} />
          <Route path='/loader' element={<Loading />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          {/* // we write seller in <Route>..</Route> because we wnat to nested routes in it
          If you write it with open & close tags, it’s usually for nested routes:  means now its every child route will be start /seller/_______     */}

              {/*  SELLER ROUTES */}

          <Route
            path="/seller"
            element={
              <SellerProtectedRoute>
                <Sellerlayout />
              </SellerProtectedRoute>
            }
          >
            <Route index element={<Addproduct />} />
            <Route path="product-list" element={<Productlist />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path='/seller-login' element={<Sellerlogin />} />
        </Routes>
      </div>
      {/* //DO NOT SHOW FOOTER ON SELLER PATH*/}
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App;
