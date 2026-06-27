import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Cart(){
  const [items, setItems] = useState([])
  const [products, setProducts] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setItems(cart)
    // load product info
    cart.forEach(ci => {
      api.get('/products/' + ci.product).then(r => {
        setProducts(prev => ({...prev, [ci.product]: r.data}))
      })
    })
  }, [])

  const total = items.reduce((s, it) => {
    const p = products[it.product]; return s + (p ? p.price * it.qty : 0)
  }, 0)

  const checkout = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user) return navigate('/login')
    navigate('/checkout')
  }

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 && <div>No items. <Link to="/">Shop now</Link></div>}
      <div>
        {items.map(it => {
          const p = products[it.product];
          return (
            <div key={it.product} className="card" style={{display:'flex', gap:12, alignItems:'center'}}>
              <img src={p ? p.image : ''} alt="" style={{width:120}}/>
              <div>
                <h3>{p ? p.name : 'Loading...'}</h3>
                <p>Qty: {it.qty}</p>
                <p>Price: ${p ? (p.price * it.qty).toFixed(2) : '...'}</p>
              </div>
            </div>
          )
        })}
      </div>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button className="btn" onClick={checkout}>Proceed to Checkout</button>
    </div>
  )
}
