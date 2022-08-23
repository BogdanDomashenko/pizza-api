const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { ROLES } = require("../utils/constants/userRolesConsts");

const PizzasModel = sequelize.define("pizzas", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	imageUrl: { type: DataTypes.STRING },
	price: { type: DataTypes.INTEGER },
	category: { type: DataTypes.INTEGER },
	rating: { type: DataTypes.INTEGER },
});

module.exports = {
	PizzasModel,
	TypesModel,
	SizesModel,
	CategoryModel,
	PizzaOrdersModel,
	UserOrdersModel,
	UsersModel,
	PizzaSizesModel,
	PizzaTypesModel,
	OrderShippingsModel,
	CallBacksModel,
	DeliveryModel,
};
