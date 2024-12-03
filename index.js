// index.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Import cấu hình Sequelize
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/categories');

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

app.use(orderRoutes);
app.use(categoryRoutes);

// Kiểm tra kết nối tới database khi ứng dụng khởi động
sequelize
	.authenticate()
	.then(() => console.log('Database connected successfully!'))
	.catch(err => console.error('Database connection error:', err));

// Start server
app.listen(3000, () => {
	console.log(`Server is running on port ${3000}`);
});
