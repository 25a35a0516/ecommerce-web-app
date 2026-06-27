const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/role');
const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { orderItems } = req.body;
    if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: 'No order items' });
    // fill name/price from DB for each product
    const itemsWithInfo = [];
    let total = 0;
    for (const it of orderItems) {
      const prod = await Product.findById(it.product);
      if (!prod) return res.status(400).json({ message: 'Product not found: ' + it.product });
      const price = prod.price;
      itemsWithInfo.push({ product: prod._id, name: prod.name, qty: it.qty, price });
      total += price * it.qty;
    }
    const order = await Order.create({ user: req.user._id, orderItems: itemsWithInfo, totalPrice: total });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: get all orders
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
