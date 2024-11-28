// thêm người dùng vào db
const connection = require('../database/index');
const createUser = (username, password) => {
	const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
	return new Promise((resolve, reject) => {
		connection.query(query, [username, password], (error, results) => {
			if (error) return reject({ success: false, error });
			resolve({ success: true, results });
		});
	});
};
// userModel.js
// Tìm kiếm người dùng trong DB
const findUserByUsername = (username, callback) => {
	const query = 'SELECT * FROM users WHERE username = ?';
	return new Promise((resolve, reject) => {
		connection.query(query, [username], (error, results) => {
			if (error) return reject({ success: false, error });
			resolve({ success: true, results });
		});
	});
};

module.exports = {
	createUser,
	findUserByUsername,
};
