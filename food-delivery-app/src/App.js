import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Importing Toaster for toast notifications
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import OrderConfirmation from './pages/OrderConfirmation';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Global Toaster settings */}
        <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route
            path="*"
            element={
              <MainApp
                cartItems={cartItems}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const MainApp = ({ cartItems, addToCart, updateQuantity, removeItem }) => {
  const navigate = useNavigate();

  const handleCartOpen = () => {
    navigate('/cart');
  };

  return (
    <>
      <Navbar cartItems={cartItems} onCartOpen={handleCartOpen} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
