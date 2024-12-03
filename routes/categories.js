const express = require('express');
const router = express.Router();
const { Category } = require('../models');
const CategoryController = require('../controllers/CategoryController');
const categoryController = new CategoryController(Category);

router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getDetail);
router.post('/categories', categoryController.create);
router.post('/categories/:id', categoryController.update);

module.exports = router;
