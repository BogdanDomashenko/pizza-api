const ApiError = require("../error/ApiError");
const {
  UsersModel,
  PizzaOrdersModel,
  UserOrdersModel,
  PizzasModel,
} = require("../models/models");
const { getOrder } = require("../services/order");

exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.body;

    const order = await getOrder(id);

    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.checkoutOrder = async (req, res, next) => {
  try {
    const { orderList, number } = req.body;

    let User = await UsersModel.findOne({ where: { phoneNumber: number } });

    if (!User) {
      User = await UsersModel.create({
        phoneNumber: number,
      });
    }

    if (!orderList || !orderList.length) {
      return next(ApiError.badRequest("'orderList' param cannot be empty"));
    }

    const UserOrder = await UserOrdersModel.create({ userID: User.id });

    orderList.forEach(async (order) => {
      await PizzasModel.findOne({ id: order.id });
      await PizzaOrdersModel.create({
        orderID: UserOrder.id,
        ...order,
        totalPrice: order.count * PizzasModel.price,
      });
    });

    res.json({ id: UserOrder.id });
  } catch (err) {
    next(err);
  }
};
