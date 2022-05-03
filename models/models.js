const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const PizzasModel = sequelize.define("pizzas", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
  category: { type: DataTypes.STRING },
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

PizzasModel.belongsToMany(TypesModel, { through: "pizzaTypes" });
PizzasModel.belongsToMany(SizesModel, { through: "pizzaSizes" });

module.exports = {
  PizzasModel,
  TypesModel,
  SizesModel,
};
