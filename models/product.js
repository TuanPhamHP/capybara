const { Model, DataTypes } = require('sequelize');
module.exports = sequelize => {
	class Product extends Model {
		static associate(models) {
			this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
			this.hasMany(models.OrderItem, { foreignKey: 'productId' });
		}
	}
	Product.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'name không được để trống' },
					notNull: { msg: 'name không được để trống' },
					len: { args: [3, 50], msg: 'name phải từ 3 đến 50 ký tự' },
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'description không được để trống' },
					notNull: { msg: 'description không được để trống' },
					len: { args: [3, 255], msg: 'description phải từ 3 đến 255 ký tự' },
				},
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					isDecimal: { msg: 'price phải là số thập phân' },
					notNull: { msg: 'price không được để trống' },
					min: { args: [0.01], msg: 'price phải lớn hơn 0' },
				},
			},
			saleId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					async isValidSale(value) {
						if (value === null) {
							return; // Cho phép null
						}
						const saleExists = await sequelize.models.Sale.findByPk(value);
						if (!saleExists) {
							throw new Error('saleId không hợp lệ');
						}
					},
				},
			},

			images: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
				validate: {
					isValidImages(value) {
						if (value === null) {
							return; // Cho phép null
						}

						if (!Array.isArray(value)) {
							throw new Error('images phải là mảng hoặc null');
						}
					},
				},
			},
			categoryId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					async isValidCategory(value) {
						if (value === null) {
							return; // Cho phép null
						}
						const saleExists = await sequelize.models.Category.findByPk(value);
						if (!saleExists) {
							throw new Error('categoryId không hợp lệ');
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Product',
			tableName: 'products',
		}
	);
	return Product;
};
