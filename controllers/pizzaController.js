const ApiError = require("../error/ApiError");
const {
	PizzasModel,
	SizesModel,
	TypesModel,
	PizzaSizesModel,
	PizzaTypesModel, SizePricesModel, TypePricesModel,
} = require("../models/models");
const { PizzaService } = require("../services/PizzaService");
exports.pizzaUpdate = async (req, res, next) => {
	try {
		const { pizza } = req.body;

		await PizzasModel.update(pizza, { where: { id: pizza.id } });
		return res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};

exports.pizzaSizes = async (req, res, next) => {
	try {
		const sizes = await PizzaService.getPizzaSizes();

		return res.json(sizes);
	} catch (err) {
		next(err);
	}
};

exports.pizzaTypes = async (req, res, next) => {
	try {
		const types = await PizzaService.getPizzaTypes();

		return res.json(types);
	} catch (err) {
		next(err);
	}
};

exports.addPizza = async (req, res, next) => {
	try {
		const { name, imageUrl, price, category, rating } = req.body;

		const newPizza = await PizzasModel.create({
			name,
			imageUrl,
			price,
			category,
			rating,
		});

		return res.json(newPizza);
	} catch (err) {
		next(err);
	}
};

exports.deletePizza = async (req, res, next) => {
	try {
		const { id } = req.params;

		await PizzaSizesModel.destroy({ where: { pizzaID: id } });
		await PizzaTypesModel.destroy({ where: { pizzaID: id } });
		await PizzasModel.destroy({ where: { id } });

		return res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

exports.pizzaList = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page);
		const size = Number.parseInt(req.query.size);
		const { count: totalCount, rows: list } = await PizzasModel.findAndCountAll(
			{
				limit: size,
				offset: size * page,
				order: [["id", "DESC"]],
			}
		);

		return res.json({ list, totalCount });
	} catch (err) {
		return next(err);
	}
};
