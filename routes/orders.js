const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const OrderController = require('../controllers/OrderController');
const orderController = new OrderController(Order);

router.get('/orders', orderController.getAll);

module.exports = router;
