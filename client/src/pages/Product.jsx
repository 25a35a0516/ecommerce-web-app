import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Product(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    api.get('/products/' + id).then(r => setProduct(r.data)).catch(err => console.error(err))
  }, [id])
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const exists = cart.find(i => i.product === id)
    if (exists) exists.qty += 1; else cart.push({ product: id, qty: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/cart')
  }
  if (!product) return <div>Loading...</div>
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>${product.price.toFixed(2)}</strong></p>
      <button className="btn" onClick={addToCart}>Add to cart</button>
    </div>
  )
}
