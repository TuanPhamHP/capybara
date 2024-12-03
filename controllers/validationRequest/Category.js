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
		description: Joi.string().max(255).optional().messages({
			'string.base': 'description phải là một chuỗi',
			'string.max': 'description không được quá 255 ký tự',
		}),
	});

	return schema;
};

module.exports = {
	createRequest,
};
