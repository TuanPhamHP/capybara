const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'userId' });
			this.hasMany(models.OrderItem, { foreignKey: 'orderId' });
		}
	}
	Order.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			userId: DataTypes.UUID,
			status: { type: DataTypes.ENUM('pending', 'completed', 'cancelled'), defaultValue: 'pending' },
		},
		{
			sequelize,
			modelName: 'Order',
			tableName: 'orders',
		}
	);
	return Order;
};
