const ApiError = require("../error/ApiError");
const {
  PizzasModel,
  SizesModel,
  TypesModel,
  PizzaSizesModel,
  PizzaTypesModel,
} = require("../models/models");

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

exports.addPizza = async (req, res, next) => {
  try {
    const { name, imageUrl, price, category, rating } = req.body;

    await PizzasModel.create({ name, imageUrl, price, category, rating });

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.deletePizza = async (req, res, next) => {
  try {
    const { id } = req.params;

    await PizzaSizesModel.destroy({ where: { pizzaID: id } });
    await PizzaTypesModel.destroy({ where: { pizzaID: id } });
    await PizzasModel.destroy({ where: { id } });

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.pizzaList = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page);
    const size = Number.parseInt(req.query.size);
    const { count: totalCount, rows: list } = await PizzasModel.findAndCountAll(
      {
        limit: size,
        offset: size * page,
        order: [["id", "DESC"]],
      }
    );

    return res.json({ list, totalCount });
  } catch (err) {
    return next(err);
  }
};
