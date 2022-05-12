const bcrypt = require("bcrypt");

const ApiError = require("../error/ApiError");
const { UsersModel } = require("../models/models");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/helpers/token");

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

    const data = {
      id: User.id,
      phoneNumber: User.phoneNumber,
      role: User.role,
    };

    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.set("Authorization", accessToken);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.sendStatus(200);
  } catch (e) {
    next(ApiError.badRequest("Logout error"));
  }
};
