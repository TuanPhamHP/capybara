require('dotenv').config(); // Load file .env

module.exports = {
	development: {
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
		dialect: 'postgres',
		pool: {
			max: parseInt(process.env.PG_MAX) || 10,
			idle: parseInt(process.env.PG_IDLE_TIMEOUT) || 30000,
			acquire: parseInt(process.env.PG_CONNECTION_TIMEOUT) || 2000,
		},
	},
	test: {
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
		dialect: 'postgres',
	},
	production: {
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
		dialect: 'postgres',
		pool: {
			max: parseInt(process.env.PG_MAX) || 10,
			idle: parseInt(process.env.PG_IDLE_TIMEOUT) || 30000,
			acquire: parseInt(process.env.PG_CONNECTION_TIMEOUT) || 2000,
		},
	},
};