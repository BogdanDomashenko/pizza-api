const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const { UsersModel } = require("../models/models");
const { ROLES } = require("../utils/constants/userRolesConsts");

const verifyToken = (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (authorization) {
			jwt.verify(
				authorization,
				process.env.ACCESS_TOKEN_SECRET,
				async (err, user) => {
					if (err) return next(ApiError.badRequest("Access token not valid"));

					const UserDB = await UsersModel.findOne({ where: { id: user.id } });
					// if(UserDB.id !== user.id || UserDB.phoneNumber !== user.phoneNumber || UserDB.role !== user.role) {
					// 	return next(ApiError.conflict("User data is out of date"));
					// }
					res.locals.id = UserDB.id;
					res.locals.phoneNumber = UserDB.phoneNumber;
					res.locals.role = UserDB.role;
					next();
				}
			);
		} else {
			res.locals.role = ROLES.phantom;
			return next();
		}
	} catch (error) {
		next(ApiError.badRequest("Access token error"));
	}
};

module.exports = verifyToken;
