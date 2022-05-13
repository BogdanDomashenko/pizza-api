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
    const { id } = req.params;

    const order = await getOrder(id);

    if (!order) {
      next(ApiError.badRequest("This order is does not exists"));
    }

    return res.json(order);
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
      const Pizza = await PizzasModel.findOne({ id: order.id });
      const totalPrice = order.count * Pizza.price;
      await PizzaOrdersModel.create({
        orderID: UserOrder.id,
        ...order,
        totalPrice: totalPrice,
      });
    });

    res.json({ id: UserOrder.id });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { order } = req.body;

    if (!order) {
      next(ApiError.badRequest("'order' param cannot be empty"));
    }
  } catch (err) {
    next(err);
  }
};
