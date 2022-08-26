const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { ROLES } = require("../utils/constants/userRolesConsts");
const { TypeModel, SizeModel, ProductModel } = require("./ProductModels");
const { ORDER_STATUSES } = require("../utils/constants/orderStatusesConsts");

const UserModel = sequelize.define("Users", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	phoneNumber: { type: DataTypes.STRING(45) },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING(45), defaultValue: ROLES.user },
});

const OrderModel = sequelize.define(
	"Orders",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		status: {
			type: DataTypes.STRING(255),
			defaultValue: ORDER_STATUSES.processing,
		},
		totalPrice: { type: DataTypes.INTEGER },
	},
	{ timestamps: true }
);

const OrderProductsModel = sequelize.define("OrderProducts", {
	count: { type: DataTypes.INTEGER },
	totalPrice: { type: DataTypes.INTEGER },
	count: { type: DataTypes.INTEGER },
});

const OrderShippingModel = sequelize.define("OrderShippings", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstName: { type: DataTypes.STRING(45) },
	lastName: { type: DataTypes.STRING(45) },
	address: { type: DataTypes.STRING(225) },
	city: { type: DataTypes.STRING(45) },
	email: { type: DataTypes.STRING(45) },
	phone: { type: DataTypes.STRING(45) },
	postCode: { type: DataTypes.STRING(45) },
	paymentMethod: { type: DataTypes.STRING(45) },
});

const CallBackModel = sequelize.define(
	"CallBacks",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	},
	{ timestamps: true }
);

const DeliveryModel = sequelize.define(
	"DeliveryModel",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		price: { type: DataTypes.INTEGER },
	},
	{ timestamps: true }
);

UserModel.hasMany(OrderModel);
OrderModel.belongsTo(UserModel);

/* OrderModel.hasMany(OrderProductsModel);
OrderProductsModel.belongsTo(OrderModel);
*/

OrderModel.belongsToMany(ProductModel, { through: OrderProductsModel });
ProductModel.belongsToMany(OrderModel, { through: OrderProductsModel });

TypeModel.hasOne(OrderProductsModel, { foreignKey: "TypeId" });
OrderProductsModel.belongsTo(TypeModel, { foreignKey: "TypeId" });

SizeModel.hasOne(OrderProductsModel, { foreignKey: "SizeId" });
OrderProductsModel.belongsTo(SizeModel, { foreignKey: "SizeId" });

OrderModel.hasOne(OrderShippingModel, {
	foreignKey: "OrderId",
});
OrderShippingModel.belongsTo(OrderModel, { foreignKey: "OrderId" });

UserModel.hasOne(CallBackModel);
CallBackModel.belongsTo(UserModel);

module.exports = {
	UserModel,
	OrderModel,
	OrderProductsModel,
	CallBackModel,
	DeliveryModel,
	OrderShippingModel,
};
