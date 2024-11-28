const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

module.exports = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

	if (!token) return res.status(401).json({ message: 'Thiếu token' });

	jwt.verify(token, SECRET_KEY, (err, user) => {
		if (err) return res.status(403).json({ message: 'Token không hợp lệ' });

		req.user = user; // Lưu thông tin người dùng vào request
		next();
	});
};
