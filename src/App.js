import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import BorrowingHistoryPage from './pages/BorrowingHistoryPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const handleBorrowBook = (book) => {
    if (!cart.find(item => item.Title === book.Title)) {
      setCart([...cart, book]);
    }
  };

  const handleReturnBook = (book) => {
    setCart(cart.filter(item => item.Title !== book.Title));
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage cart={cart} onBorrowBook={handleBorrowBook} onReturnBook={handleReturnBook} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} onReturnBook={handleReturnBook} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
        <Route path="/profile" element={<BorrowingHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
