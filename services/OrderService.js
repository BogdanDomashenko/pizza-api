const { UserOrdersModel, PizzasModel, PizzaOrdersModel } = require("../models/models");

exports.getOrder = async (id) => {
  // const Order = await UserOrdersModel.findOne({
  //   where: { id },
  //   include: [{ model: PizzasModel }],
  //   attributes: ["id", "createdAt"],
  // });

  const Order = await UserOrdersModel.findOne({
    where: { id },
    include: [{ model: PizzaOrdersModel, attributes: ["props", "totalPrice", "count"], include: PizzasModel }],
  });

  console.log(Order);

  return Order;
};
