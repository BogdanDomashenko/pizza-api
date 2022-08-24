const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { ROLES } = require("../utils/constants/userRolesConsts");

const ProductModel = sequelize.define("products", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	price: { type: DataTypes.INTEGER },
	rating: { type: DataTypes.INTEGER },
});

const CategoryModel = sequelize.define("category", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
});

const ProductImage = sequelize.define("Product_Images", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	url: { type: DataTypes.STRING },
});

const TypesModel = sequelize.define("types", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING(45) },
	price: { type: DataTypes.INTEGER },
});

const SizesModel = sequelize.define("sizes", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING(45) },
	price: { type: DataTypes.INTEGER },
});

//PRODUCT RELATIONS
CategoryModel.hasOne(ProductModel, { foreignKey: "categoryId" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "categoryId" });

ProductModel.hasMany(ProductImage);
ProductImage.belongsTo(ProductModel);

ProductModel.belongsToMany(TypesModel, { through: "Product_Types" });
TypesModel.belongsToMany(ProductModel, { through: "Product_Types" });

ProductModel.belongsToMany(SizesModel, { through: "Product_Sizes" });
SizesModel.belongsToMany(ProductModel, { through: "Product_Sizes" });

module.exports = {
	ProductModel,
	ProductImage,
	CategoryModel,
	SizesModel,
	TypesModel,
};
