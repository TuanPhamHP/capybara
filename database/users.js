// thêm người dùng vào db
const createUser = (username, password) => {
	const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
	return new Promise((resolve, reject) => {
		connection.query(query, [username, password], (error, results) => {
			if (error) return reject({ success: false, error });
			resolve({ success: true, results });
		});
	});
};
module.exports = {
	createUser,
};
