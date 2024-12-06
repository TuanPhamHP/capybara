// index.js
require('dotenv').config();

const express = require('express');
const multer = require('multer');
const sequelize = require('./config/database'); // Import cấu hình Sequelize
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

const app = express();
const upload = multer();
const PORT = process.env.PG_PORT || 3000;

// Cấu hình EJS làm view engine
app.set('view engine', 'ejs');

// Middleware để parse dữ liệu từ form
app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(express.json()); // application/json

// Middleware Multer để xử lý multipart/form-data
app.use(upload.none()); // Dùng upload.none() nếu form không có file
// Thiết lập express để phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static('public'));

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
	res.send('Welcome to the Node.js API!');
});

app.use('/api/', orderRoutes);
app.use('/api/', categoryRoutes);
app.use('/api/', productRoutes);

// Kiểm tra kết nối tới database khi ứng dụng khởi động
sequelize
	.authenticate()
	.then(() => console.log('Database connected successfully!'))
	.catch(err => console.error('Database connection error:', err));

// Start server
app.listen(3000, () => {
	console.log(`Server is running on port ${3000}`);
});
