const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { ROLES } = require("../utils/constants/userRolesConsts");
const { TypeModel, SizeModel } = require("./ProductModels");
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
});

const CallBackModel = sequelize.define(
	"CallBacks",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	},
	{ timestamps: true }
);

UserModel.hasMany(OrderModel);
OrderModel.belongsTo(UserModel);

OrderModel.hasMany(OrderProductsModel);
OrderProductsModel.belongsTo(OrderModel);

TypeModel.hasOne(OrderProductsModel, { foreignKey: "typeId" });
OrderProductsModel.belongsTo(TypeModel, { foreignKey: "typeId" });

SizeModel.hasOne(OrderProductsModel, { foreignKey: "sizeId" });
OrderProductsModel.belongsTo(SizeModel, { foreignKey: "sizeId" });

UserModel.hasOne(CallBackModel);
CallBackModel.belongsTo(UserModel);

module.exports = {
	UserModel,
	OrderModel,
	OrderProductsModel,
	CallBackModel,
};
