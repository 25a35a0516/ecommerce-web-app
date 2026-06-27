import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Orders(){
  const [orders, setOrders] = useState([])
  useEffect(()=> {
    api.get('/orders/myorders').then(r => setOrders(r.data)).catch(err => console.error(err))
  }, [])
  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(o => (
        <div className="card" key={o._id}>
          <p>Order ID: {o._id}</p>
          <p>Total: ${o.totalPrice.toFixed(2)}</p>
          <p>Status: {o.status}</p>
          <ul>
            {o.orderItems.map(it => <li key={it.product}>{it.name} x {it.qty} — ${it.price}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
