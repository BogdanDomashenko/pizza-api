const { model } = require("../db");
const {
  UserOrdersModel,
  PizzasModel,
  UsersModel,
} = require("../models/models");

exports.ordersList = async (req, res, next) => {
  try {
    const orders = await UserOrdersModel.findAll({
      include: [
        { model: PizzasModel },
        { model: UsersModel, attributes: ["id", "phoneNumber", "role"] },
      ],
      attributes: ["id", "status", "createdAt"],
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};
