const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { ROLES } = require("../utils/constants/userRolesConsts");

const ProductModel = sequelize.define("pizzas", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	imageUrl: { type: DataTypes.STRING },
	price: { type: DataTypes.INTEGER },
	category: { type: DataTypes.INTEGER },
	rating: { type: DataTypes.INTEGER },
});

const PizzaTypesModel = sequelize.define("pizzaTypes", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	pizzaID: { type: DataTypes.INTEGER },
	typeID: { type: DataTypes.INTEGER },
});

const TypesModel = sequelize.define("types", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING(45) },
	price: { type: DataTypes.INTEGER },
});

const PizzaSizesModel = sequelize.define("pizzaSizes", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	pizzaID: { type: DataTypes.INTEGER },
	sizeID: { type: DataTypes.INTEGER },
});

const SizesModel = sequelize.define("sizes", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING(45) },
	price: { type: DataTypes.INTEGER },
});

const CategoryModel = sequelize.define("categories", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING(255) },
});

const PizzaOrdersModel = sequelize.define("pizzaOrders", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	orderID: { type: DataTypes.INTEGER },
	pizzaID: { type: DataTypes.INTEGER },
	props: { type: DataTypes.STRING(225) },
	count: { type: DataTypes.INTEGER },
	totalPrice: { type: DataTypes.INTEGER },
});

const UserOrdersModel = sequelize.define(
	"userOrders",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userID: { type: DataTypes.INTEGER },
		status: { type: DataTypes.STRING(255), defaultValue: "processing" },
	},
	{ timestamps: true }
);

const UsersModel = sequelize.define("users", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	phoneNumber: { type: DataTypes.STRING(45) },
	password: { type: DataTypes.STRING(45) },
	role: { type: DataTypes.STRING(45), defaultValue: ROLES.user },
});

const OrderShippingsModel = sequelize.define("orderShippings", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	userOrderID: { type: DataTypes.INTEGER },
	firstName: { type: DataTypes.STRING(45) },
	lastName: { type: DataTypes.STRING(45) },
	address: { type: DataTypes.STRING(225) },
	city: { type: DataTypes.STRING(45) },
	email: { type: DataTypes.STRING(45) },
	phone: { type: DataTypes.STRING(45) },
	postCode: { type: DataTypes.STRING(45) },
	paymentMethod: { type: DataTypes.STRING(45) },
});

const CallBacksModel = sequelize.define(
	"callBacks",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userID: { type: DataTypes.INTEGER, unique: true },
	},
	{ timestamps: true }
);

const DeliveryModel = sequelize.define("deliveries", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	price: { type: DataTypes.INTEGER },
});

/* ProductModel.hasOne(CategoryModel);
CategoryModel.belongsTo(ProductModel); */

ProductModel.belongsToMany(TypesModel, { through: PizzaTypesModel });
TypesModel.belongsToMany(ProductModel, { through: PizzaTypesModel });

ProductModel.belongsToMany(SizesModel, { through: PizzaSizesModel });
SizesModel.belongsToMany(ProductModel, { through: PizzaSizesModel });

// ProductModel.belongsToMany(PizzaOrdersModel, { through: UserOrdersModel });
// PizzaOrdersModel.belongsToMany(ProductModel, { through: UserOrdersModel });
//
// UserOrdersModel.belongsToMany(PizzaOrdersModel, { through: ProductModel });
//

ProductModel.belongsToMany(UserOrdersModel, {
	through: PizzaOrdersModel,
});
UserOrdersModel.belongsToMany(ProductModel, {
	through: PizzaOrdersModel,
	foreignKey: "orderID",
});

//new

UserOrdersModel.hasOne(OrderShippingsModel, {
	foreignKey: "userOrderID",
});
OrderShippingsModel.belongsTo(UserOrdersModel, { foreignKey: "id" });

UserOrdersModel.hasMany(PizzaOrdersModel, { foreignKey: "orderID" });
PizzaOrdersModel.belongsTo(UserOrdersModel, { foreignKey: "id" });

ProductModel.hasMany(PizzaOrdersModel, { foreignKey: "id" });
PizzaOrdersModel.belongsTo(ProductModel, { foreignKey: "pizzaID" });

UsersModel.hasMany(UserOrdersModel, { foreignKey: "id" });
UserOrdersModel.belongsTo(UsersModel, { foreignKey: "userID" });
//new

//
UsersModel.hasMany(UserOrdersModel);
UserOrdersModel.belongsTo(UsersModel);

ProductModel.hasMany(PizzaOrdersModel);
PizzaOrdersModel.belongsTo(ProductModel);

UsersModel.hasOne(CallBacksModel, {
	foreignKey: "id",
});
CallBacksModel.belongsTo(UsersModel, { foreignKey: "userID" });

module.exports = {
	ProductModel,
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
