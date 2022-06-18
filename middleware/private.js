const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const { ROLES } = require("../utils/constants/userRolesConsts");

function private(req, res, next) {
	try {
		console.log("ROLE: ", res.locals.role);
		if (res.locals.role !== ROLES.admin) return next(ApiError.forbidden());

		next();
	} catch (error) {
		next(ApiError.forbidden());
	}
}

module.exports = private;
