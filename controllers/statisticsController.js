const { Sequelize } = require("../db");
const {
	PizzaOrdersModel,
	PizzasModel,
	UserOrdersModel,
} = require("../models/models");

exports.pizzaPopularity = async (req, res, next) => {
	try {
		const pizzas = await PizzasModel.findAll({
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

exports.salesByMonth = async (req, res, next) => {
	try {
		const pizzas = await PizzasModel.findAll({
			include: [
				{
					model: UserOrdersModel,
					attributes: ["createdAt"],
					where: Sequelize.where(
						Sequelize.fn("MONTH", Sequelize.col("createdAt")),
						5
					),
				},
			],
		});

		res.send(pizzas);
	} catch (error) {
		next(error);
	}
};
