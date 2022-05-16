const ApiError = require("../error/ApiError");
const { PizzasModel, SizesModel, TypesModel } = require("../models/models");

exports.pizzaUpdate = async (req, res, next) => {
  try {
    const { pizza } = req.body;

    await PizzasModel.update(pizza, { where: { id: pizza.id } });
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

exports.pizzaSizes = async (req, res, next) => {
  try {
    const list = await SizesModel.findAll({});

    return res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.pizzaTypes = async (req, res, next) => {
  try {
    const types = await TypesModel.findAll({});

    return res.json(types);
  } catch (err) {
    next(err);
  }
};
