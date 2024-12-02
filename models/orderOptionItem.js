const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
	class OrderItemOption extends Model {
		static associate(models) {
			this.belongsTo(models.OrderItem, { foreignKey: 'orderItemId' });
			this.belongsTo(models.Option, { foreignKey: 'optionId' });
		}
	}
	OrderItemOption.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			orderItemId: DataTypes.UUID,
			optionId: DataTypes.UUID,
		},
		{
			sequelize,
			modelName: 'OrderItemOption',
			tableName: 'order_item_options',
		}
	);
	return OrderItemOption;
};
