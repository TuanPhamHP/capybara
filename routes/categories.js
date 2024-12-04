const express = require('express');
const router = express.Router();
const app = express();
const { Category } = require('../models');
const CategoryController = require('../controllers/CategoryController');
const categoryController = new CategoryController(Category);
// Admin routes
router.get('/admin/categories', categoryController.getAll);
router.get('/admin/categories/:id', categoryController.getDetail);
router.post('/admin/categories', categoryController.create);
router.post('/admin/categories/:id', categoryController.update);

// Customer routes
router.get('/customer/categories', categoryController.getAll);
router.get('/customer/categories/:id', categoryController.getDetail);

module.exports = router;
