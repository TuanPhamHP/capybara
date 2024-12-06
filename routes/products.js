const express = require('express');
const router = express.Router();
const app = express();
const { Product } = require('../models');
const ProductController = require('../controllers/ProductController');
const productController = new ProductController(Product);

// Admin routes
router.get('/admin/products', productController.getAll);
router.get('/admin/products/:id', productController.getDetail);
router.post('/admin/products', productController.create);
router.post('/admin/products/:id', productController.update);
router.delete('/admin/products/:id', productController.destroy);
router.post('/admin/products/:id/add-sale', productController.addSale);

// Customer routes
router.get('/customer/products', productController.getAll);
router.get('/customer/products/:id', productController.getDetail);

module.exports = router;
