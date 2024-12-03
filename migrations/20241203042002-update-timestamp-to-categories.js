'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Cập nhật cấu trúc các cột createdAt và updatedAt
		await queryInterface.changeColumn('categories', 'createdAt', {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Thêm giá trị mặc định là thời gian tạo
		});

		await queryInterface.changeColumn('categories', 'updatedAt', {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Thêm giá trị mặc định là thời gian tạo
		});
	},

	async down(queryInterface, Sequelize) {
		// Rollback: Đặt lại các cột về trạng thái cũ nếu cần thiết
		await queryInterface.changeColumn('categories', 'createdAt', {
			type: Sequelize.DATE,
			allowNull: false,
		});

		await queryInterface.changeColumn('categories', 'updatedAt', {
			type: Sequelize.DATE,
			allowNull: false,
		});
	},
};
