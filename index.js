require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PG_PORT || 3000;
// Cấu hình EJS làm view engine
app.set('view engine', 'ejs');

// Middleware để parse dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: false }));

// Thiết lập express để phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static('public'));

const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	max: process.env.PG_MAX || 10, // Giá trị mặc định
	idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT || 30000,
	connectionTimeoutMillis: process.env.PG_CONNECTION_TIMEOUT || 2000,
});

pool
	.connect()
	.then(() => console.log('Database connected successfully!'))
	.catch(err => console.error('Database connection error:', err));
// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
	res.send('Welcome to the Node.js API!');
});

app.get('/data', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM sample_table');
		res.json(result.rows);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
