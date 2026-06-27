import React, { useEffect, useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const [items, setItems] = useState([])
  const [products, setProducts] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setItems(cart)
    cart.forEach(ci => {
      api.get('/products/' + ci.product).then(r => setProducts(prev => ({...prev, [ci.product]: r.data})))
    })
  }, [])

  const placeOrder = async () => {
    try {
      const orderItems = items.map(i => ({ product: i.product, qty: i.qty }))
      const res = await api.post('/orders', { orderItems })
      localStorage.removeItem('cart')
      alert('Order placed')
      navigate('/orders')
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const total = items.reduce((s, it) => {
    const p = products[it.product]; return s + (p ? p.price * it.qty : 0)
  }, 0)

  return (
    <div>
      <h2>Checkout</h2>
      {items.length === 0 ? <div>No items</div> : (
        <>
          <div>
            {items.map(it => {
              const p = products[it.product];
              return <div key={it.product} className="card">
                <h4>{p ? p.name : 'Loading...'}</h4>
                <p>Qty: {it.qty}</p>
              </div>
            })}
          </div>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="btn" onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  )
}
