const express = require('express');
const router = express.Router();
const app = express();
const { User } = require('../models');
const UserController = require('../controllers/UserController');
const userController = new UserController(User);
// Admin routes
router.post('/admin/auth/login', userController.login);
router.post('/admin/auth/register', userController.register);

// Customer routes
router.post('/customer/auth/login', userController.login);
router.post('/customer/auth/register', userController.customerRegister);

module.exports = router;
