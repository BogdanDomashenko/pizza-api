const { UserOrdersModel, PizzasModel } = require("../models/models");

exports.getOrder = async (id) => {
  const Order = await UserOrdersModel.findOne({
    where: { id },
    include: [{ model: PizzasModel }],
    attributes: ["id", "createdAt"],
  });

  return Order;
};
