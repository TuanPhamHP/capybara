const { Category } = require('../models');
const { responseSuccess, responseFail } = require('../utils/response');
const { createRequest } = require('./validationRequest/Category');
class CategoryController {
	/**
	 *
	 * @param {Category} CategoryModel
	 */
	#category;

	constructor(CategoryModel) {
		this.category = CategoryModel;
	}

	getAll = async (req, res) => {
		try {
			const options = {};
			const { page, per_page } = req.query;

			if (page && per_page) {
				options.limit = per_page;
				options.offset = (+page - 1) * +per_page;
			}

			const { count, rows } = await this.category.findAndCountAll(options);
			const pagination = {
				total: count,
				count: rows.length,
				per_page: +per_page,
				current_page: +page,
			};
			res.status(200).json(responseSuccess('categories', rows, pagination));
		} catch (error) {
			res.status(500).json(responseFail(error.message));
		}
	};

	getDetail = async (req, res) => {
		try {
			// console.log(this.Category);
			const { id } = req.params;
			const category = await this.category.findByPk(id);
			if (category) {
				res.status(200).json(responseSuccess('category', category));
			} else {
				res.status(404).json(responseFail('Not found'));
			}
		} catch (error) {
			res.status(500).json(responseFail(error.message));
		}
	};

	create = async (req, res) => {
		try {
			const schema = createRequest();
			const { error, value } = schema.validate(req.body, { abortEarly: false });

			// Nếu có lỗi validation, trả về thông báo lỗi chi tiết
			if (error) {
				const errorMessages = error.details.map(detail => detail.message);
				return res.status(400).json(responseFail(errorMessages.join(', ')));
			}

			const { name, description = '', image = null } = value; // Dữ liệu đã được xác thực
			const category = await this.category.create({ name, description, image });
			res.status(200).json(responseSuccess('category', category));
		} catch (error) {
			res.status(500).json(responseFail(error.message));
		}
	};
	update = async (req, res) => {
		try {
			const { id } = req.params;
			const category = await this.category.findByPk(id);
			if (!category) {
				res.status(404).json(responseFail('Not found'));
				return;
			}

			const schema = createRequest();
			const { error, value } = schema.validate(req.body, { abortEarly: false });

			// Nếu có lỗi validation, trả về thông báo lỗi chi tiết
			if (error) {
				const errorMessages = error.details.map(detail => detail.message);
				return res.status(400).json(responseFail(errorMessages.join(', ')));
			}

			const { name, description = '', image = null } = value; // Dữ liệu đã được xác thực
			category.name = name;
			category.description = description;
			category.image = image;
			category.save();
			res.status(200).json(responseSuccess('category', category));
		} catch (error) {
			res.status(500).json(responseFail(error.message));
		}
	};
}

module.exports = CategoryController;
