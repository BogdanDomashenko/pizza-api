const {
	ProductModel,
	ProductImage,
	SizeModel,
	TypeModel,
} = require("../models/ProductModels");
const {
	OrderModel,
	OrderProductsModel,
	OrderShippingModel,
} = require("../models/UserModels");

/* exports.getOrder = async (id) => {
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
}; */

exports.OrderService = {
	async create(products, UserId, OrderShipping) {
		const order = await OrderModel.create(
			{ UserId, OrderShipping },
			{ include: { model: OrderShippingModel } }
		);

		let totalPrice = 0;

		for (let product of products) {
			const { price: productPrice } = await ProductModel.findOne({
				where: { id: product.id },
			});
			totalPrice += productPrice * product.count;

			await OrderProductsModel.create({
				count: product.count,
				totalPrice: productPrice * product.count,
				ProductId: product.id,
				OrderId: order.id,
				TypeId: product.TypeId,
				SizeId: product.SizeId,
			});
		}

		await order.update({ totalPrice, count: OrderModel.length });
		await order.save();

		return order;
	},
	async get(id) {
		const order = await OrderModel.findOne({
			where: { id },
			include: {
				model: OrderProductsModel,
				attributes: ["count", "totalPrice"],
				include: [
					{
						model: ProductModel,
						include: [ProductImage],
					},
					TypeModel,
					SizeModel,
				],
			},
		});

		return order;
	},
	async getByUser(UserId, page, size) {
		const { count: totalCount, rows: orders } =
			await OrderModel.findAndCountAll({
				where: { UserId },
				limit: size,
				offset: size * page,
				order: [["createdAt", "DESC"]],
				attributes: ["id", "status", "createdAt", "totalPrice"],
				include: {
					model: OrderProductsModel,
					attributes: ["count", "totalPrice"],
					include: [
						{
							model: ProductModel,
							include: [ProductImage],
						},
						TypeModel,
						SizeModel,
					],
				},
			});

		return { list: orders, totalCount };
	},
};
