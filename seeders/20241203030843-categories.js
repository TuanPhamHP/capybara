'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'categories',
			[
				{
					name: 'Fast Food',
					description: 'Các món ăn nhanh như burger, pizza, khoai tây chiên.',
				},
				{
					name: 'Beverages',
					description: 'Đồ uống như cà phê, trà, nước ngọt, nước ép.',
				},
				{
					name: 'Desserts',
					description: 'Các món tráng miệng như bánh ngọt, kem, chè.',
				},
				{
					name: 'Healthy Options',
					description: 'Các món ăn lành mạnh như salad, thức ăn ít calo, đồ ăn chay.',
				},
				{
					name: 'Asian Cuisine',
					description: 'Các món ăn châu Á như sushi, phở, dim sum.',
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('categories', null, {});
	},
};
