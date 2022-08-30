const { UserOrdersModel, PizzasModel, PizzaOrdersModel } = require("../models/models");

exports.getOrder = async (id) => {
	// const Order = await UserOrdersModel.findOne({
	//   where: { id },
	//   include: [{ model: ProductModel }],
	//   attributes: ["id", "createdAt"],
	// });

	const Order = await UserOrdersModel.findOne({
		where: { id },
		include: [
			{
				model: PizzaOrdersModel,
				attributes: ["props", "totalPrice", "count"],
				include: ProductModel,
			},
		],
	});

	console.log(Order);

	return Order;
<<<<<<< HEAD
>>>>>>> upd
=======
>>>>>>> 8875b454a424d7abb9cd760b3b748e599fa405a0
};
