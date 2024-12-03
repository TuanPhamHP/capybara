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
				type: DataTypes.INTEGER, // Đổi kiểu từ UUID sang INTEGER
				autoIncrement: true, // Tự động tăng giá trị
				primaryKey: true,
			},
			name: DataTypes.TEXT,
			description: DataTypes.STRING,
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
