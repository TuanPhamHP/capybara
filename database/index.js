const mysql = require('mysql2');

// Kết nối đến MySQL mà không chọn database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	port: 3306,
});

const createUsersTableQuery = `CREATE TABLE	IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;
// Kết nối MySQL
connection.connect(err => {
	if (err) {
		console.error('Lỗi kết nối: ' + err.stack);
		return;
	}
	console.log('Đã kết nối đến MySQL');

	// Kiểm tra và tạo database nếu chưa tồn tại
	connection.query('CREATE DATABASE IF NOT EXISTS hello_nodejs', (error, results) => {
		if (error) throw error;
		console.log('Database đã tồn tại hoặc đã được tạo');

		// Chuyển sang sử dụng database hello_nodejs
		connection.changeUser({ database: 'hello_nodejs' }, err => {
			if (err) throw err;
			console.log('Đã chuyển sang sử dụng database hello_nodejs');
			connection.query(createUsersTableQuery, (err, result) => {
				if (err) throw err;
			});
		});
	});
});

module.exports = connection;
