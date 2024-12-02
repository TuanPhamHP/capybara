// index.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Import cấu hình Sequelize

const app = express();
const PORT = process.env.PG_PORT || 3000;

// Cấu hình EJS làm view engine
app.set('view engine', 'ejs');

// Middleware để parse dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: false }));

// Thiết lập express để phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static('public'));

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
	res.send('Welcome to the Node.js API!');
});

// Thêm route để truy vấn dữ liệu từ Sequelize
app.get('/data', async (req, res) => {
	try {
		const result = await sequelize.query('SELECT * FROM sample_table'); // Đảm bảo rằng bảng sample_table tồn tại trong DB
		res.json(result[0]); // Sequelize trả về kết quả trong mảng, lấy phần tử đầu tiên
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Kiểm tra kết nối tới database khi ứng dụng khởi động
sequelize
	.authenticate()
	.then(() => console.log('Database connected successfully!'))
	.catch(err => console.error('Database connection error:', err));

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
