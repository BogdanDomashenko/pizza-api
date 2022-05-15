const ApiError = require("../error/ApiError");
const { PizzasModel } = require("../models/models");

exports.pizzaUpdate = async (req, res, next) => {
  try {
    const { pizza } = req.body;
    console.log(pizza);

    PizzasModel.update(pizza, { where: { id: pizza.id } });
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};
