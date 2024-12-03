const { Order } = require('../models');

class OrderController {
	/**
	 *
	 * @param {Order} OrderModel
	 */
	constructor(OrderModel) {
		this.order = OrderModel;
	}

	getAll = async (req, res) => {
		try {
			// console.log(this.order);
			const orders = await this.order.findAll();
			res.json(orders);
		} catch (error) {
			res.status(500).send(error.message);
		}
	};
}

module.exports = OrderController;
