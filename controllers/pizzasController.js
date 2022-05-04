const ApiError = require("../error/ApiError");
const { PizzasModel } = require("../models/models");

exports.pizzasList = async (req, res, next) => {
  try {
    const list = await PizzasModel.findAll({});

    return res.json(list);
  } catch (err) {
    return next(err);
  }
};
