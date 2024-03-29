const { Sequelize } = require("../db");
<<<<<<< HEAD
const { ProductModel } = require("../models/ProductModels");
const { OrderProductsModel, OrderModel } = require("../models/UserModels");
=======
const {
	PizzaOrdersModel,
	ProductModel,
	UserOrdersModel,
} = require("../models/models");
>>>>>>> upd

exports.productPopularity = async (req, res, next) => {
	try {
		const pizzas = await PizzasModel.findAll({
			include: [{ model: PizzaOrdersModel }],
>>>>>>> upd
		});

		const mappedProducts = products.map((product) => ({
			id: product.id,
			name: product.name,
			sales: product.OrderProducts.length,
		}));

		res.send(mappedProducts);
	} catch (error) {
		next(error);
	}
};

exports.salesBy = async (req, res, next) => {
	try {
		const by = req.query.by;
		const num = Number.parseInt(req.query.num);

		const pizzas = await PizzasModel.findAll({
			include: [
				{
					model: OrderProductsModel,
					include: {
						model: OrderModel,
						attributes: ["createdAt"],
						where: Sequelize.where(
							Sequelize.fn(by, Sequelize.col("createdAt")),
							num
						),
					},
				},
			],
		});

		const mappedProducts = products.map((product) => ({
			id: product.id,
			name: product.name,
			sales: product.OrderProducts.length,
		}));

		res.send(mappedProducts);
	} catch (error) {
		next(error);
	}
};
