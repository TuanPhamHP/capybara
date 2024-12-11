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
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			email: { type: DataTypes.STRING, unique: true },
			password: DataTypes.STRING,
			role: { type: DataTypes.ENUM('client', 'admin'), defaultValue: 'client' },
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'users',
		}
	);
	return User;
};
