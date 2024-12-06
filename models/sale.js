const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
	class Sale extends Model {
		static associate(models) {
			this.hasMany(models.Product, { foreignKey: 'saleId' });
		}
	}

	Sale.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true, // Tự động tăng giá trị
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			type: {
				type: DataTypes.ENUM('percentage', 'fixed'),
				allowNull: false,
			},
			value: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			startDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Sale',
			tableName: 'sales',
		}
	);

	return Sale;
};
