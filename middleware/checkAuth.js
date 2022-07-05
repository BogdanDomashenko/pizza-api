const ApiError = require("../error/ApiError");

const authAccessToken = (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (authorization) {
			jwt.verify(
				authorization,
				process.env.ACCESS_TOKEN_SECRET,
				async (err, user) => {
					if (err) return next(ApiError.badRequest("Access token not valid"));

					const UserDB = await UsersModel.findOne({ where: { id: user.id } });
					res.locals.id = UserDB.id;
					res.locals.phoneNumber = UserDB.phoneNumber;
					res.locals.role = UserDB.role;
					next();
				}
			);
		} else {
			return next(ApiError.badRequest("Token does not exist"));
		}
	} catch (error) {
		next(ApiError.badRequest("Access token error"));
	}
};

module.exports = authAccessToken;
