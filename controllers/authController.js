const bcrypt = require("bcrypt");

const ApiError = require("../error/ApiError");
const { UsersModel } = require("../models/models");

exports.signIn = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    const User = await UsersModel.findOne({ where: { phoneNumber } });

    if (!User) {
      return next(ApiError.badRequest("This user does not exists"));
    }

    const isPassEquals = await bcrypt.compare(password, User.password);

    if (!isPassEquals) {
      return next(ApiError.badRequest("Incorrect password"));
    }

    res.json({ id: User.id, phoneNumber: User.phoneNumber, role: User.role });
  } catch (error) {
    next(error);
  }
};
