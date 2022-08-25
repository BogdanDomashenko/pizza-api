const { Sequelize } = require("../db");
const {
	PizzaOrdersModel,
	ProductModel,
	UserOrdersModel,
} = require("../models/models");

exports.pizzaPopularity = async (req, res, next) => {
	try {
		const pizzas = await ProductModel.findAll({
			include: [{ model: PizzaOrdersModel }],
		});

		const mappedPizzas = pizzas.map((pizza) => ({
			id: pizza.id,
			name: pizza.name,
			sales: pizza.pizzaOrders.length,
		}));

		res.send(mappedPizzas);
	} catch (error) {
		next(error);
	}
};

exports.salesBy = async (req, res, next) => {
	try {
		const by = req.query.by;
		const num = Number.parseInt(req.query.num);

		const pizzas = await ProductModel.findAll({
			include: [
				{
					model: UserOrdersModel,
					attributes: ["createdAt"],
					where: Sequelize.where(
						Sequelize.fn(by, Sequelize.col("createdAt")),
						num
					),
				},
				{
					model: PizzaOrdersModel,
				},
			],
		});

		const mappedPizzas = pizzas.map((pizza) => ({
			id: pizza.id,
			name: pizza.name,
			sales: pizza.pizzaOrders.length,
		}));

		res.send(mappedPizzas);
	} catch (error) {
		next(error);
	}
};
