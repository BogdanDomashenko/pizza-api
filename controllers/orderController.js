const ApiError = require("../error/ApiError");
const {
	UsersModel,
	PizzaOrdersModel,
	UserOrdersModel,
	PizzasModel,
	OrderShippingsModel,
} = require("../models/models");
const { getOrder } = require("../services/OrderService");
const { ROLES } = require("../utils/constants/userRolesConsts");
const { PizzaService } = require("../services/PizzaService");

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
		const { orderList, shippingData } = req.body;

		const { id: userID } = res.locals;

		if (!orderList || !orderList.length) {
			return next(ApiError.badRequest("'orderList' param cannot be empty"));
		}

		const UserOrder = await PizzaService.createOrder(userID, orderList);
		const OrderShipping = await OrderShippingsModel.create({
			...shippingData,
			userOrderID: UserOrder.id,
		});

		res.json({ id: UserOrder.id });
	} catch (err) {
		next(err);
	}
};

exports.phantomCheckoutOrder = async (req, res, next) => {
	try {
		const { orderList, shippingData } = req.body;

		let User = await UsersModel.findOne({
			where: { phoneNumber: shippingData.phone },
		});

		if (User && User.role !== ROLES.phantom) {
			return next(
				ApiError.badRequest(
					"User with this phone number already exists, please sign in"
				)
			);
		}

		User = await UsersModel.create({
			phoneNumber: shippingData.phone,
			role: ROLES.phantom,
		});

		if (!orderList || !orderList.length) {
			return next(ApiError.badRequest("'orderList' param cannot be empty"));
		}

		const UserOrder = await PizzaService.createOrder(User.id, orderList);
		const OrderShipping = await OrderShippingsModel.create({
			...shippingData,
			userOrderID: UserOrder.id,
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
					{
						model: PizzaOrdersModel,
						attributes: ["props", "totalPrice", "count"],
						include: PizzasModel,
					},
					UsersModel
				],
				attributes: ["id", "status", "createdAt"],
			});

		const mappedOrders = orders.map((x) => {
			const order = x.get({ plain: true });
			let totalOrderPrice = 0;
			order.pizzaOrders.forEach((item) => {
				totalOrderPrice += item.totalPrice;
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
				where: { userID: id },
				include: [
					{
						model: PizzaOrdersModel,
						attributes: ["props", "totalPrice", "count"],
						include: PizzasModel,
					},
				],
				attributes: ["id", "status", "createdAt"],
			});

		const mappedOrders = orders.map((x) => {
			const order = x.get({ plain: true });
			let totalOrderPrice = 0;
			order.pizzaOrders.forEach((item) => {
				totalOrderPrice += item.totalPrice;
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

exports.shippingOrderData = async (req, res, next) => {
	try {
		const { id } = req.params;

		const shippingData = await OrderShippingsModel.findOne({
			where: { userOrderID: id },
		});

		res.json(shippingData);
	} catch (error) {
		next(error);
	}
};
