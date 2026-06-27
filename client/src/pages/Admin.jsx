import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Admin(){
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name:'', description:'', price:0, image:'', countInStock:0 })

  const load = () => api.get('/products').then(r=>setProducts(r.data))
  useEffect(()=> load(), [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/products', form)
      setForm({ name:'', description:'', price:0, image:'', countInStock:0 })
      load()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const del = async (id) => {
    if (!confirm('Delete product?')) return
    await api.delete('/products/' + id)
    load()
  }

  const edit = async (id) => {
    const p = products.find(x=>x._id===id)
    const name = prompt('Name', p.name)
    if (!name) return
    await api.put('/products/' + id, { ...p, name })
    load()
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="card form">
        <h3>Add Product</h3>
        <form onSubmit={submit}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          <input className="input" placeholder="Description" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          <input className="input" placeholder="Price" type="number" value={form.price} onChange={e=>setForm(f=>({...f,price:parseFloat(e.target.value)}))} />
          <input className="input" placeholder="Image URL" value={form.image} onChange={e=>setForm(f=>({...f,image:e.target.value}))} />
          <input className="input" placeholder="Stock" type="number" value={form.countInStock} onChange={e=>setForm(f=>({...f,countInStock:parseInt(e.target.value||0)}))} />
          <button className="btn" type="submit">Add</button>
        </form>
      </div>

      <h3>Manage Products</h3>
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>${p.price}</p>
            <div>
              <button className="btn" onClick={()=>edit(p._id)}>Edit</button>
              <button className="btn" onClick={()=>del(p._id)} style={{background:'#c82333'}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
