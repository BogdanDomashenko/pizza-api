const ApiError = require("../error/ApiError");
const { ProductService } = require("../services/ProductService");

const {
  PizzasModel,
  SizesModel,
  TypesModel,
  PizzaSizesModel,
  PizzaTypesModel,
} = require("../models/models");
const { PizzaService } = require("../services/PizzaService");

exports.aviablePizzas = async (req, res, next) => {
  try {
    const category = Number.parseInt(req.query.category);
    const page = Number.parseInt(req.query.page);
    const size = Number.parseInt(req.query.size);

    const where = category ? { category } : null;

    const { count: totalCount, rows: list } = await PizzasModel.findAndCountAll(
      {
        limit: size,
        offset: size * page,
        distinct: true,
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
          },
        ],
        where,
      }
    );

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
  } catch (err) {
    return next(err);
  }
};

exports.allStockPizzas = async (req, res, next) => {
	const page = Number.parseInt(req.query.page);
	const size = Number.parseInt(req.query.size);

  try {
    const { count: totalCount, rows: list } = await PizzasModel.findAndCountAll(
      {
        limit: size,
        offset: size * page,
        attributes: ["id", "name"],
        order: [["id", "DESC"]],
        distinct: true,
        include: [
          {
            model: SizesModel,
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: TypesModel,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      }
    );

    const parsedList = JSON.parse(JSON.stringify(list));

		const resList = parsedList.map((listItem) => {
			return {
				...listItem,
				sizes: listItem.sizes.map((size) => size.name),
				types: listItem.types.map((type) => type.name),
			};
		});

    return res.json({ list: resList, totalCount });
  } catch (err) {
    return next(err);
  }
};

exports.setPizzaAvailable = async (req, res, next) => {
	try {
		const { id } = req.params;
<<<<<<< HEAD

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
<<<<<<< HEAD
>>>>>>> upd
=======
>>>>>>> 8875b454a424d7abb9cd760b3b748e599fa405a0

		res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};

exports.setPizzaNotAvailable = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) return next(ApiError.badRequest("Request must have 'id' param"));

    await PizzaSizesModel.destroy({ where: { pizzaID: id } });
    await PizzaTypesModel.destroy({ where: { pizzaID: id } });

		res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};

exports.setPizzaSizeAvailable = async (req, res, next) => {
  try {
    const { id, sizeID, available } = req.body;

		if (!id || !sizeID)
			return next(
				ApiError.badRequest("Request body must have 'id' and 'sizeID' param")
			);

    if (available) {
      await PizzaSizesModel.create({ pizzaID: id, sizeID });
    } else {
      await PizzaSizesModel.destroy({ where: { pizzaID: id, sizeID } });
    }
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

exports.setPizzaTypeAvailable = async (req, res, next) => {
  try {
    const { id, typeID, available } = req.body;

		if (!id || !typeID)
			return next(
				ApiError.badRequest("Request body must have 'id' and 'typeID' param")
			);

    if (available) {
      await PizzaTypesModel.create({ pizzaID: id, typeID });
    } else {
      await PizzaTypesModel.destroy({ where: { pizzaID: id, typeID } });
    }

		res.sendStatus(200);
	} catch (err) {
		return next(err);
	}
};
