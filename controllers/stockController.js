const { Sequelize } = require("../db");
const ApiError = require("../error/ApiError");
const {
  PizzasModel,
  SizesModel,
  TypesModel,
  PizzaSizesModel,
  PizzaTypesModel,
} = require("../models/models");

exports.aviablePizzas = async (req, res, next) => {
  try {
    const list = await PizzasModel.findAll({
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
    });

    const parsedList = JSON.parse(JSON.stringify(list));

    const resList = parsedList.map((listItem) => {
      return {
        ...listItem,
        sizes: listItem.sizes.map((size) => size.name),
        types: listItem.types.map((type) => type.name),
      };
    });

    return res.json(resList);
  } catch (err) {
    return next(err);
  }
};

exports.allStockPizzas = async (req, res, next) => {
  try {
    const list = await PizzasModel.findAll({
      attributes: ["id", "name"],
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
    });

    const parsedList = JSON.parse(JSON.stringify(list));

    const resList = parsedList.map((listItem) => {
      return {
        ...listItem,
        sizes: listItem.sizes.map((size) => size.name),
        types: listItem.types.map((type) => type.name),
      };
    });

    return res.json(resList);
  } catch (err) {
    return next(err);
  }
};

exports.setPizzaAvailable = async (req, res, next) => {
  try {
    const { id } = req.params;

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
