// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Kiểm tra nếu là môi trường production (Render hoặc các môi trường cloud khác yêu cầu SSL)
const isDev = process.env.NODE_ENV === 'dev';

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	username: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	dialectOptions: !isDev
		? {
				ssl: {
					require: true,
					rejectUnauthorized: false, // Cấm verify SSL certificate (chỉ khi cần thiết trong môi trường production)
				},
		  }
		: {},
});

module.exports = sequelize;
