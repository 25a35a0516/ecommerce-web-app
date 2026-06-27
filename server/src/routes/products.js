const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/role');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get product by id
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: create product
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { name, description, price, image, countInStock } = req.body;
    const p = await Product.create({ name, description, price, image, countInStock });
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update product
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: delete product
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
