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

    const mappedOrders = orders.map((x) => {
      const order = x.get({ plain: true });

      let totalOrderPrice = 0;
      order.pizzas.forEach((pizza) => {
        totalOrderPrice += pizza.pizzaOrders.totalPrice;
      });

      return {
        ...order,
        totalOrderPrice,
      };
    });

    res.json(mappedOrders);
  } catch (error) {
    next(error);
  }
};
