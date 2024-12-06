const { Product } = require('../models');
const { responseSuccess, responseFail } = require('../utils/response');
const { createRequest } = require('./validationRequest/Product');
const { Sale } = require('../models');

class ProductController {
	/**
	 *
	 * @param {Product} ProductModel
	 */
	#product;

	constructor(Product) {
		this.product = Product;
	}
	isSaleExists = async saleId => {
		const sale = await Sale.findByPk(saleId); // Sale là model Sequelize của bảng sales
		return !!sale; // Trả về true nếu tồn tại, false nếu không
	};
	getAll = async (req, res) => {
		try {
			const options = {};
			const { page, per_page } = req.query;

			if (page && per_page) {
				options.limit = per_page;
				options.offset = (+page - 1) * +per_page;
			}

			const { count, rows } = await this.product.findAndCountAll(options);
			const pagination = {
				total: count,
				count: rows.length,
				per_page: +per_page,
				current_page: +page,
			};
			res.status(200).json(responseSuccess('products', rows, pagination));
		} catch (error) {
			res.status(500).json(responseFail(error.message));
		}
	};

	getDetail = async (req, res) => {
		try {
			// console.log(this.Product);
			const { id } = req.params;
			const product = await this.product.findByPk(id);
			if (product) {
				res.status(200).json(responseSuccess('product', product));
			} else {
				res.status(404).json(responseFail('Not found'));
			}
		} catch (error) {
			res.status(500).json(responseFail(error.message));
		}
	};

	create = async (req, res) => {
		try {
			const { name, description, price, images, saleId } = req.body;

			const product = await Product.create({
				name,
				description,
				price,
				images,
				saleId,
			});
			res.status(200).json(responseSuccess('product', product));
		} catch (error) {
			if (error.name === 'SequelizeValidationError') {
				// Gửi lỗi validation rõ ràng
				const errors = error.errors.map(err => err.message);
				return res.status(400).json({ message: 'Validation Error', errors });
			}
			res.status(500).json(responseFail(error.message));
		}
	};
	update = async (req, res) => {
		try {
			const { id } = req.params;
			const product = await this.product.findByPk(id);
			if (!product) {
				res.status(404).json(responseFail('Not found'));
				return;
			}
			const { name, description, price, images, saleId } = req.body;
			// Cập nhật các trường có dữ liệu mới từ body
			product.name = name || product.name;
			product.description = description || product.description;
			product.price = price || product.price;
			product.images = images || product.images;
			product.saleId = saleId || product.saleId;
			// Lưu thay đổi và kiểm tra validation
			await product.save();

			res.status(200).json(responseSuccess('product', product));
		} catch (error) {
			if (error.name === 'SequelizeValidationError') {
				// Gửi lỗi validation rõ ràng
				const errors = error.errors.map(err => err.message);
				return res.status(400).json({ message: 'Validation Error', errors });
			}
			res.status(500).json(responseFail(error.message));
		}
	};

	addSale = async (req, res) => {
		try {
			const { id } = req.params;
			const product = await this.product.findByPk(id);
			if (!product) {
				res.status(404).json(responseFail('Not found'));
				return;
			}
			const { saleId } = req.body;

			product.saleId = saleId || product.saleId;
			// Lưu thay đổi và kiểm tra validation
			await product.save();

			res.status(200).json(responseSuccess('product', product));
		} catch (error) {
			if (error.name === 'SequelizeValidationError') {
				// Gửi lỗi validation rõ ràng
				const errors = error.errors.map(err => err.message);
				return res.status(400).json({ message: 'Validation Error', errors });
			}
			res.status(500).json(responseFail(error.message));
		}
	};

	destroy = async (req, res) => {
		try {
			const { id } = req.params;
			const product = await this.product.findByPk(id);
			if (!product) {
				res.status(404).json(responseFail('Not found'));
				return;
			}
			product.destroy(); // soft-delete
			res.status(200).json(responseSuccess('product', null));
		} catch (error) {
			res.status(500).json(responseFail(error.message));
		}
	};
}

module.exports = ProductController;
