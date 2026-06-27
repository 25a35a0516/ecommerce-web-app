import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Admin from './pages/Admin'

function App() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <div>
      <header className="nav">
        <Link to="/">Store</Link>
        <div>
          <Link to="/cart">Cart</Link>
          {user ? <Link to="/orders">Orders</Link> : <Link to="/login">Login</Link>}
          {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
