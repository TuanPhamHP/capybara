const { User } = require('../models');
const { responseSuccess, responseFail } = require('../utils/response');
const { createRequest, loginRequest } = require('./validationRequest/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
class UserController {
	/**
	 *
	 * @param {User} UserModel
	 */
	#user;

	constructor(UserModel) {
		this.user = UserModel;
	}
	register = async (req, res) => {
		try {
			// Validate dữ liệu từ client
			const schema = createRequest();
			const { error, value } = schema.validate(req.body, { abortEarly: false });

			if (error) {
				const errorMessages = error.details.map(detail => detail.message);
				return res.status(400).json(responseFail(errorMessages.join(', ')));
			}

			const { name, email, password } = value; // Dữ liệu đã xác thực

			// Kiểm tra xem email đã tồn tại hay chưa
			const existingUser = await this.user.findOne({ where: { email } });
			if (existingUser) {
				return res.status(400).json(responseFail('Email đã tồn tại.'));
			}

			// Mã hóa mật khẩu
			const hashedPassword = await bcrypt.hash(password, 10);

			// Lưu user vào database
			const newUser = await this.user.create({ name, email, password: hashedPassword });

			// Trả về phản hồi thành công
			res.status(201).json(responseSuccess('user', newUser));
		} catch (err) {
			// Phản hồi lỗi không mong muốn
			console.log(err);
			res.status(500).json(responseFail('Đã xảy ra lỗi, vui lòng thử lại sau.'));
		}
	};

	login = async (req, res) => {
		try {
			const schema = loginRequest();
			const { error, value } = schema.validate(req.body, { abortEarly: false });

			if (error) {
				const errorMessages = error.details.map(detail => detail.message);
				return res.status(400).json(responseFail(errorMessages.join(', ')));
			}
			const { email, password } = req.body;

			// 1. Tìm user theo email
			const user = await this.user.findOne({ where: { email } });

			if (!user) {
				return res.status(404).json(responseFail('Email hoặc mật khẩu không đúng'));
			}

			// 2. So sánh mật khẩu
			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				return res.status(401).json(responseFail('Email hoặc mật khẩu không đúng'));
			}

			// 3. Tạo token JWT
			const payload = {
				id: user.id,
				email: user.email,
				role: user.role,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

			// 4. Trả phản hồi
			return res.status(200).json(
				responseSuccess('user', {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					token,
				})
			);
		} catch (error) {
			// 5. Xử lý lỗi
			return res.status(500).json(responseFail('Đã xảy ra lỗi: ' + error.message));
		}
	};
}

module.exports = UserController;
