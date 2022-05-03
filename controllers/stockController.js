const { Sequelize } = require("../db");
const { PizzasModel, SizesModel, TypesModel } = require("../models/models");

exports.aviablePizzas = async (req, res) => {
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
};
