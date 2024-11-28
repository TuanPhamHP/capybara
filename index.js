require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
// Cấu hình EJS làm view engine
app.set('view engine', 'ejs');

// Middleware để parse dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: false }));

// Thiết lập express để phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static('public'));

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false, // Required for Render's PostgreSQL
	},
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
