const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
	class OrderItem extends Model {
		static associate(models) {
			this.belongsTo(models.Order, { foreignKey: 'orderId' });
			this.belongsTo(models.Product, { foreignKey: 'productId' });
			this.hasMany(models.OrderItemOption, { foreignKey: 'orderItemId' });
		}
	}
	OrderItem.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			orderId: DataTypes.UUID,
			productId: DataTypes.UUID,
			quantity: DataTypes.INTEGER,
			price: DataTypes.DECIMAL(10, 2),
		},
		{
			sequelize,
			modelName: 'OrderItem',
			tableName: 'order_items',
		}
	);
	return OrderItem;
};
