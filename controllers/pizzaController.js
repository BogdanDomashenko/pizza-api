const ApiError = require("../error/ApiError");
const {
	ProductModel,
	SizesModel,
	TypesModel,
	PizzaSizesModel,
	PizzaTypesModel,
} = require("../models/models");
const { PizzaService } = require("../services/PizzaService");

exports.pizzaUpdate = async (req, res, next) => {
	try {
		const { pizza } = req.body;

		await ProductModel.update(pizza, { where: { id: pizza.id } });
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

		const newPizza = await ProductModel.create({
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
		await ProductModel.destroy({ where: { id } });

		return res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

exports.pizzaList = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page);
		const size = Number.parseInt(req.query.size);
		const { count: totalCount, rows: list } =
			await ProductModel.findAndCountAll({
				limit: size,
				offset: size * page,
				order: [["id", "DESC"]],
			});

		return res.json({ list, totalCount });
	} catch (err) {
		return next(err);
	}
};

exports.updateType = async (req, res, next) => {
	try {
		const { id, name, price } = req.body;

		await TypesModel.update({ id, name, price }, { where: { id } });

		return res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};

exports.updateSize = async (req, res, next) => {
	try {
		const { id, name, price } = req.body;

		await SizesModel.update({ name, price }, { where: { id } });

		return res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};

exports.addType = async (req, res, next) => {
	try {
		const { name, price } = req.body;

		const newType = await TypesModel.create({ name, price });

		res.json(newType);
	} catch (err) {
		return next(err);
	}
};

exports.addSize = async (req, res, next) => {
	try {
		const { name, price } = req.body;

		const newSize = await SizesModel.create({ name, price });

		res.json(newSize);
	} catch (err) {
		return next(err);
	}
};

exports.deleteSize = async (req, res, next) => {
	try {
		const { id } = req.body;

		await PizzaSizesModel.destroy({ where: { sizeID: id } });
		await SizesModel.destroy({ where: { id } });

		res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};

exports.deleteType = async (req, res, next) => {
	try {
		const { id } = req.body;

		await PizzaTypesModel.destroy({ where: { typeID: id } });
		await TypesModel.destroy({ where: { id } });

		res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};
