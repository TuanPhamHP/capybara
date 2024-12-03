'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'images', {
			type: Sequelize.ARRAY(Sequelize.STRING),
			allowNull: true,
			defaultValue: [],
			comment: 'Ảnh của sản phẩm',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('products', 'images');
	},
};
