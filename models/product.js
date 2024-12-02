const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
	class Product extends Model {
		static associate(models) {
			this.belongsTo(models.Category, { foreignKey: 'categoryId' });
			this.hasMany(models.OrderItem, { foreignKey: 'productId' });
		}
	}
	Product.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			price: DataTypes.DECIMAL(10, 2),
			description: DataTypes.TEXT,
			imageUrl: DataTypes.STRING,
			categoryId: DataTypes.UUID,
		},
		{
			sequelize,
			modelName: 'Product',
			tableName: 'products',
		}
	);
	return Product;
};
