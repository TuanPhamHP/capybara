const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
	class Option extends Model {
		static associate(models) {
			this.hasMany(models.OrderItemOption, { foreignKey: 'optionId' });
		}
	}
	Option.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			price: DataTypes.DECIMAL(10, 2),
		},
		{
			sequelize,
			modelName: 'Option',
			tableName: 'options',
		}
	);
	return Option;
};
