const ApiError = require("../error/ApiError");
const { UserModel, OrderShippingsModel } = require("../models/UserModels");
const { ROLES } = require("../utils/constants/userRolesConsts");
const { OrderService } = require("../services/OrderService");
const { ProductService } = require("../services/ProductService");
const { DeliveryService } = require("../services/DeliveryService");

exports.getOrder = async (req, res, next) => {
	try {
		const { id } = req.params;

		const order = await OrderService.get(id);

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

		const { id: userId } = res.locals;

		if (!orderList || !orderList.length) {
			return next(ApiError.badRequest("'orderList' param cannot be empty"));
		}

		const order = await OrderService.create(orderList, userId, shippingData);

		res.json({ id: order.id });
	} catch (err) {
		next(err);
	}
};

exports.phantomCheckoutOrder = async (req, res, next) => {
	try {
		const { orderList, shippingData } = req.body;

		let user = await UserModel.findOne({
			where: { phoneNumber: shippingData.phone },
		});

		if (user && user.role !== ROLES.phantom) {
			return next(
				ApiError.badRequest(
					"User with this phone number already exists, please sign in"
				)
			);
		}

		if (!user) {
			user = await UserModel.create({
				phoneNumber: shippingData.phone,
				role: ROLES.phantom,
			});
		}

		if (!orderList || !orderList.length) {
			return next(ApiError.badRequest("'orderList' param cannot be empty"));
		}

		const order = await OrderService.create(orderList, user.id, shippingData);

		res.json({ id: order.id });
	} catch (err) {
		next(err);
	}
};

exports.userOrderList = async (req, res, next) => {
	try {
		const id = res.locals.id;
		const page = Number.parseInt(req.query.page);
		const size = Number.parseInt(req.query.size);

		const orders = await OrderService.getByUser(id, page, size);

		res.json(orders);
	} catch (error) {
		next(error);
	}
};

/* 
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
					UserModel,
				],
				attributes: ["id", "status", "createdAt"],
			});

		const deliveryPrice = await DeliveryService.getPrice();

		const mappedOrders = orders.map((x) => {
			const order = x.get({ plain: true });
			let totalOrderPrice = deliveryPrice;
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
*/

exports.deliveryPrice = async (req, res, next) => {
	try {
		const price = await DeliveryService.getPrice();

		res.json({ price });
	} catch (error) {
		next(error);
	}
};

exports.setDeliveryPrice = async (req, res, next) => {
	try {
		const { price } = req.body;
		await DeliveryService.setPrice(price);

		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};
