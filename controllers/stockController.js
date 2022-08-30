const ApiError = require("../error/ApiError");
const { ProductService } = require("../services/ProductService");

const {
	ProductModel,
<<<<<<< HEAD
	SizeModel,
	TypeModel,
	ProductImage,
	CategoryModel,
	ProductSizes,
	ProductTypes,
} = require("../models/ProductModels");

exports.availableProducts = async (req, res, next) => {
=======
	SizesModel,
	TypesModel,
	PizzaSizesModel,
	PizzaTypesModel,
} = require("../models/models");
const { PizzaService } = require("../services/PizzaService");

exports.aviablePizzas = async (req, res, next) => {
>>>>>>> upd
	try {
		const category = Number.parseInt(req.query.category);
		const page = Number.parseInt(req.query.page);
		const size = Number.parseInt(req.query.size);

<<<<<<< HEAD
		const where = category ? { categoryId: category } : null;
=======
		const where = category ? { category } : null;
>>>>>>> upd

		const { count: totalCount, rows: list } =
			await ProductModel.findAndCountAll({
				limit: size,
				offset: size * page,
				distinct: true,
<<<<<<< HEAD
				attributes: ["id", "name", "price", "rating"],
				include: [
					{
						model: SizeModel,
						where: {},
						through: { attributes: [] },
					},
					{
						model: TypeModel,

						where: {},
						through: { attributes: [] },
					},
					{
						model: ProductImage,
						attributes: ["url"],
					},
					{
						model: CategoryModel,
=======
				include: [
					{
						model: SizesModel,
						attributes: ["name"],
						through: { attributes: [] },
						where: {},
					},
					{
						model: TypesModel,
						attributes: ["name"],
						through: { attributes: [] },
						where: {},
>>>>>>> upd
					},
				],
				where,
			});

<<<<<<< HEAD
		const sizes = await ProductService.getProductSizes();
		const types = await ProductService.getProductTypes();

		return res.json({ list, totalCount, sizes, types });
=======
		const parsedList = JSON.parse(JSON.stringify(list));

		const resList = parsedList.map((listItem) => {
			return {
				...listItem,
				sizes: listItem.sizes.map((size) => size.name),
				types: listItem.types.map((type) => type.name),
			};
		});

		const sizes = await PizzaService.getPizzaSizes();
		const types = await PizzaService.getPizzaTypes();

		return res.json({ list: resList, totalCount, sizes, types });
>>>>>>> upd
	} catch (err) {
		return next(err);
	}
};

exports.allStockPizzas = async (req, res, next) => {
	const page = Number.parseInt(req.query.page);
	const size = Number.parseInt(req.query.size);

	try {
		const { count: totalCount, rows: list } =
			await ProductModel.findAndCountAll({
				limit: size,
				offset: size * page,
				attributes: ["id", "name"],
				order: [["id", "DESC"]],
				distinct: true,
				include: [
					{
<<<<<<< HEAD
						model: SizeModel,
=======
						model: SizesModel,
>>>>>>> upd
						attributes: ["name"],
						through: { attributes: [] },
					},
					{
<<<<<<< HEAD
						model: TypeModel,
=======
						model: TypesModel,
>>>>>>> upd
						attributes: ["name"],
						through: { attributes: [] },
					},
				],
			});

<<<<<<< HEAD
		return res.json({ list: list, totalCount });
=======
		const parsedList = JSON.parse(JSON.stringify(list));

		const resList = parsedList.map((listItem) => {
			return {
				...listItem,
				sizes: listItem.sizes.map((size) => size.name),
				types: listItem.types.map((type) => type.name),
			};
		});

		return res.json({ list: resList, totalCount });
>>>>>>> upd
	} catch (err) {
		return next(err);
	}
};

exports.setPizzaAvailable = async (req, res, next) => {
	try {
		const { id } = req.params;

<<<<<<< HEAD
		const sizes = await SizeModel.findAll({});
		const types = await TypeModel.findAll({});

		const productSizesArr = sizes
			.filter((size) => size.name !== "none")
			.map((size) => ({
				ProductId: id,
				SizeId: size.id,
			}));

		const productTypesArr = types
			.filter((size) => size.name !== "none")
			.map((type) => ({
				ProductId: id,
				TypeId: type.id,
			}));

		await ProductSizes.bulkCreate(productSizesArr);
		await ProductTypes.bulkCreate(productTypesArr);
=======
		const sizes = await SizesModel.findAll({});
		const types = await TypesModel.findAll({});

		const pizzaSizesArr = sizes.map((size) => ({
			pizzaID: id,
			sizeID: size.id,
		}));

		const pizzaTypesArr = types.map((type) => ({
			pizzaID: id,
			typeID: type.id,
		}));

		await PizzaSizesModel.bulkCreate(pizzaSizesArr);
		await PizzaTypesModel.bulkCreate(pizzaTypesArr);
>>>>>>> upd

		res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};

exports.setPizzaNotAvailable = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) return next(ApiError.badRequest("Request must have 'id' param"));

<<<<<<< HEAD
		await ProductSizes.destroy({ where: { ProductId: id } });
		await ProductTypes.destroy({ where: { ProductId: id } });
=======
		await PizzaSizesModel.destroy({ where: { pizzaID: id } });
		await PizzaTypesModel.destroy({ where: { pizzaID: id } });
>>>>>>> upd

		res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};

exports.setPizzaSizeAvailable = async (req, res, next) => {
	try {
<<<<<<< HEAD
		const { id, SizeId, available } = req.body;

		if (!id || !SizeId)
			return next(
				ApiError.badRequest("Request body must have 'id' and 'SizeId' param")
			);

		if (available) {
			await ProductSizes.create({ ProductId: id, SizeId });
		} else {
			await ProductSizes.destroy({ where: { ProductId: id, SizeId } });
=======
		const { id, sizeID, available } = req.body;

		if (!id || !sizeID)
			return next(
				ApiError.badRequest("Request body must have 'id' and 'sizeID' param")
			);

		if (available) {
			await PizzaSizesModel.create({ pizzaID: id, sizeID });
		} else {
			await PizzaSizesModel.destroy({ where: { pizzaID: id, sizeID } });
>>>>>>> upd
		}
		res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};

exports.setPizzaTypeAvailable = async (req, res, next) => {
	try {
<<<<<<< HEAD
		const { id, TypeId, available } = req.body;

		if (!id || !TypeId)
			return next(
				ApiError.badRequest("Request body must have 'id' and 'TypeId' param")
			);

		if (available) {
			await ProductTypes.create({ ProductId: id, TypeId });
		} else {
			await ProductTypes.destroy({ where: { ProductId: id, TypeId } });
=======
		const { id, typeID, available } = req.body;

		if (!id || !typeID)
			return next(
				ApiError.badRequest("Request body must have 'id' and 'typeID' param")
			);

		if (available) {
			await PizzaTypesModel.create({ pizzaID: id, typeID });
		} else {
			await PizzaTypesModel.destroy({ where: { pizzaID: id, typeID } });
>>>>>>> upd
		}

		res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};
