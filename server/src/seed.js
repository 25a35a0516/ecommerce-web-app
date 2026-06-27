/*
  Run: node src/seed.js
  Seeds sample products.
*/
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  {
    name: "Classic T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 19.99,
    image: "https://via.placeholder.com/200x150.png?text=T-Shirt",
    countInStock: 50
  },
  {
    name: "Stylish Jeans",
    description: "Slim fit denim jeans",
    price: 49.99,
    image: "https://via.placeholder.com/200x150.png?text=Jeans",
    countInStock: 30
  },
  {
    name: "Sneakers",
    description: "Casual sneakers for everyday wear",
    price: 69.99,
    image: "https://via.placeholder.com/200x150.png?text=Sneakers",
    countInStock: 20
  }
];

const run = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('Please set MONGO_URI in env');
    process.exit(1);
  }
  await connectDB(uri);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products');
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
