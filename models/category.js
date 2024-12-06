const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
	class Category extends Model {
		static associate(models) {
			this.hasMany(models.Product, { foreignKey: 'categoryId' });
		}
	}
	Category.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: DataTypes.TEXT,
			description: DataTypes.STRING,
			image: DataTypes.STRING || null,
		},
		{
			sequelize,
			modelName: 'Category',
			tableName: 'categories',
			timestamps: true,
		}
	);
	return Category;
};
