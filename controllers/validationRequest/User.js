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
		email: Joi.string().required().email().messages({
			'string.base': 'email phải là một chuỗi',
			'string.empty': 'email không được để trống',
			'any.required': 'email là trường bắt buộc',
		}),
		password: Joi.string().required().messages({
			'string.base': 'password phải là một chuỗi',
			'string.max': 'password không được quá 255 ký tự',
			'string.empty': 'email không được để trống',
			'any.required': 'password là trường bắt buộc',
		}),
	});

	return schema;
};
const loginRequest = () => {
	const schema = Joi.object({
		email: Joi.string().required().email().messages({
			'string.base': 'email phải là một chuỗi',
			'string.empty': 'email không được để trống',
			'any.required': 'email là trường bắt buộc',
		}),
		password: Joi.string().required().messages({
			'string.base': 'password phải là một chuỗi',
			'string.empty': 'email không được để trống',
			'any.required': 'password là trường bắt buộc',
		}),
	});

	return schema;
};
module.exports = {
	createRequest,
	loginRequest,
};
