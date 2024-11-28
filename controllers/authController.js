const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const SECRET_KEY = 'some-key';
// Đăng ký người dùng mới
const register = async (req, res) => {
	const { username, password } = req.body;

	// Mã hóa mật khẩu
	bcrypt.hash(password, 10, async (err, hashedPassword) => {
		if (err) return res.status(500).json({ message: 'Lỗi mã hóa mật khẩu' });

		const results = await userModel.createUser(username, hashedPassword);
		if (results.success) {
			res.status(200).json({
				success: true,
				message: 'Đăng ký thành công!',
				errors: null,
				data: { userId: results.insertId },
			});
		} else {
			res.status(500).json({
				success: false,
				message: 'Đăng ký thất bại!',
				errors: results.error,
				data: null,
			});
		}
	});
};
// Đăng nhập và cấp JWT
const login = async (req, res) => {
	const { username, password } = req.body;
	const results = await userModel.findUserByUsername(username);
	if (results.length === 0) return res.status(404).json({ message: 'Người dùng không tồn tại' });
	const user = results.results[0];

	// So sánh mật khẩu
	bcrypt.compare(password, user.password, (err, validPassword) => {
		if (err || !validPassword) return res.status(401).json({ message: 'Mật khẩu không đúng' });

		// Tạo JWT
		const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
		res.json({ token });
	});
};

module.exports = { register, login };
