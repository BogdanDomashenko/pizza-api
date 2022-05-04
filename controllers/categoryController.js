const { CategoryModel } = require("../models/models");

exports.categoryList = async (req, res, next) => {
  try {
    const list = await CategoryModel.findAll({});

    return res.json(list);
  } catch (err) {
    next(err);
  }
};
