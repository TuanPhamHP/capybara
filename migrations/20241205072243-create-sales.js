'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('sales', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				comment: 'Tên chương trình giảm giá',
			},
			type: {
				type: Sequelize.ENUM('percentage', 'fixed'),
				allowNull: false,
				comment: 'Loại giảm giá: percentage hoặc fixed',
			},
			value: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
				comment: 'Giá trị giảm giá (tỉ lệ hoặc giá cố định)',
			},
			startDate: {
				type: Sequelize.DATE,
				allowNull: false,
				comment: 'Ngày bắt đầu giảm giá',
			},
			endDate: {
				type: Sequelize.DATE,
				allowNull: false,
				comment: 'Ngày kết thúc giảm giá',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
		await queryInterface.addColumn('products', 'saleId', {
			type: Sequelize.INTEGER,
			allowNull: true,
			comment: 'id sale',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('sales');

		const tableDescription = await queryInterface.describeTable('products');

		if (tableDescription['yourColumnName']) {
			await queryInterface.removeColumn('products', 'yourColumnName');
		}
	},
};
