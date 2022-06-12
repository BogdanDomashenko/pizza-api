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
			const Pizza = await PizzasModel.findOne({ where: { id: order.pizzaID } });
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

		await UserOrdersModel.update({ ...order }, { where: { id: order.id } });

		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

exports.orderList = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page);
		const size = Number.parseInt(req.query.size);
		const { count: totalCount, rows: orders } =
			await UserOrdersModel.findAndCountAll({
				limit: size,
				offset: size * page,
				order: [["createdAt", "DESC"]],
				distinct: true,
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

		res.json({ list: mappedOrders, totalCount });
	} catch (error) {
		next(error);
	}
};

exports.userOrderList = async (req, res, next) => {
	try {
		const id = res.locals.id;
		const page = Number.parseInt(req.query.page);
		const size = Number.parseInt(req.query.size);
		const { count: totalCount, rows: orders } =
			await UserOrdersModel.findAndCountAll({
				limit: size,
				offset: size * page,
				order: [["createdAt", "DESC"]],
				distinct: true,
				include: [
					{ model: PizzasModel },
					{
						model: UsersModel,
						attributes: ["id", "phoneNumber", "role"],
						where: { id },
					},
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

		res.json({ list: mappedOrders, totalCount });
	} catch (error) {
		next(error);
	}
};
