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

const PizzaTypesModel = sequelize.define("pizzaTypes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pizzaID: { type: DataTypes.INTEGER },
  typeID: { type: DataTypes.INTEGER },
});

const TypesModel = sequelize.define("types", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(45) },
});

const PizzaSizesModel = sequelize.define("pizzaSizes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pizzaID: { type: DataTypes.INTEGER },
  sizeID: { type: DataTypes.INTEGER },
});

const SizesModel = sequelize.define("sizes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(45) },
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

const SizePricesModel = sequelize.define("sizePrices", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sizeID: { type: DataTypes.INTEGER },
  price: { type: DataTypes.INTEGER },
})

const TypePricesModel = sequelize.define("typePrices", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  typeID: { type: DataTypes.INTEGER },
  price: { type: DataTypes.INTEGER },
})

/* PizzasModel.hasOne(CategoryModel);
CategoryModel.belongsTo(PizzasModel); */

PizzasModel.belongsToMany(TypesModel, { through: PizzaTypesModel });
TypesModel.belongsToMany(PizzasModel, { through: PizzaTypesModel });

PizzasModel.belongsToMany(SizesModel, { through: PizzaSizesModel });
SizesModel.belongsToMany(PizzasModel, { through: PizzaSizesModel });

/* PizzasModel.belongsToMany(PizzaOrdersModel, { through: UserOrdersModel });
PizzaOrdersModel.belongsToMany(PizzasModel, { through: UserOrdersModel }); */

/* UserOrdersModel.belongsToMany(PizzaOrdersModel, { through: PizzasModel });  */

PizzasModel.belongsToMany(UserOrdersModel, {
  through: PizzaOrdersModel,
});
UserOrdersModel.belongsToMany(PizzasModel, {
  through: PizzaOrdersModel,
  foreignKey: "orderID",
});

UsersModel.hasMany(UserOrdersModel);
UserOrdersModel.belongsTo(UsersModel);

PizzasModel.hasMany(PizzaOrdersModel);
PizzaOrdersModel.belongsTo(PizzasModel);

TypesModel.hasOne(TypePricesModel);
TypePricesModel.belongsTo(TypesModel);

SizesModel.hasOne(SizePricesModel);
SizePricesModel.belongsTo(SizesModel);

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
  SizePricesModel,
  TypePricesModel
};
