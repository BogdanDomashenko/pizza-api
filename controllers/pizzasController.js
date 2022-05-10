const ApiError = require("../error/ApiError");
const { PizzasModel } = require("../models/models");

exports.pizzasList = async (req, res, next) => {
  try {
    const list = await PizzasModel.findAll({});
    const pizzasObj = {};
    list.forEach((item) => {
      pizzasObj[item.id] = item;
    });
    return res.json(pizzasObj);
  } catch (err) {
    return next(err);
  }
};
