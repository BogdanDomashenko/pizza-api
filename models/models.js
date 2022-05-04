const sequelize = require("../db");
const { DataTypes } = require("sequelize");

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

/* PizzasModel.hasOne(CategoryModel);
CategoryModel.belongsTo(PizzasModel); */

PizzasModel.belongsToMany(TypesModel, { through: PizzaTypesModel });
TypesModel.belongsToMany(PizzasModel, { through: PizzaTypesModel });

PizzasModel.belongsToMany(SizesModel, { through: PizzaSizesModel });
SizesModel.belongsToMany(PizzasModel, { through: PizzaSizesModel });

module.exports = {
  PizzasModel,
  TypesModel,
  SizesModel,
  CategoryModel,
};
