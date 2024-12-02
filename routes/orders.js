const express = require('express');
const { Order, User } = require('../models');
const router = express.Router();

router.get('/orders', async (req, res) => {
	try {
		const orders = await Order.findAll({ include: User });
		res.json(orders);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
