const { UserOrdersModel, PizzasModel } = require("../models/models");

exports.getOrder = async (id) => {
  const Order = await UserOrdersModel.findOne({
    where: { id },
    include: [{ model: PizzasModel }],
  });

  return Order;

  return Order.pizzas.map(({ id, pizzaOrders }) => ({
    pizzaId: id,
    count: pizzaOrders.count,
    props: pizzaOrders.props,
  }));
};
