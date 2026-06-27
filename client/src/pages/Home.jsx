import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Home(){
  const [products, setProducts] = useState([])
  useEffect(() => { api.get('/products').then(r => setProducts(r.data)).catch(console.error) }, [])
  return (
    <div>
      <h2>Products</h2>
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price.toFixed(2)}</p>
            <Link to={`/product/${p._id}`} className="btn">View</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
