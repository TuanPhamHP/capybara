const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
	class User extends Model {
		static associate(models) {
			this.hasMany(models.Order, { foreignKey: 'userId' });
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			email: { type: DataTypes.STRING, unique: true },
			password: DataTypes.STRING,
			role: { type: DataTypes.ENUM('customer', 'admin'), defaultValue: 'customer' },
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'users',
		}
	);
	return User;
};
