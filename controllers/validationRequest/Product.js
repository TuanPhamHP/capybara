const Joi = require('joi');

const createRequest = () => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required().messages({
			'string.base': 'name phải là một chuỗi',
			'string.empty': 'name không được để trống',
			'string.min': 'name phải có ít nhất 3 ký tự',
			'string.max': 'name không được quá 50 ký tự',
			'any.required': 'name là trường bắt buộc',
		}),
		description: Joi.string().min(3).max(255).required().messages({
			'string.base': 'description phải là một chuỗi',
			'string.empty': 'description không được để trống',
			'string.min': 'description phải có ít nhất 3 ký tự',
			'string.max': 'description không được quá 255 ký tự',
			'string.required': 'description là trường bắt buộc',
		}),
		price: Joi.number().required().positive().messages({
			'number.base': 'price phải là một số',
			'number.greater': 'price phải lớn hơn 0',
			'any.required': 'price là trường bắt buộc',
		}),
		images: Joi.custom((value, helpers) => {
			if (Array.isArray(value)) {
				for (const item of value) {
					if (typeof item !== 'string') {
						return helpers.error('any.invalid');
					}
				}
				return value;
			} else if (value === null) {
				return value;
			}
			return helpers.error('any.invalid');
		}).messages({
			'any.invalid': 'images phải là mảng chuỗi hoặc null',
		}),
		saleId: Joi.any(),
	});

	return schema;
};

module.exports = {
	createRequest,
};
