const ApiError = require("../error/ApiError");
const { UsersModel } = require("../models/models");

exports.userList = async (req, res, next) => {
	try {
		const list = await UsersModel.findAll();

		const mappedList = list.map((item) => ({
			id: item.id,
			phoneNumber: item.phoneNumber,
			role: item.role,
			isRegistered: !!item.password,
		}));
		res.json(mappedList);
	} catch (err) {
		next(err);
	}
};

exports.setUserRole = async (req, res, next) => {
	try {
		const { id, role } = req.body;
		const user = await UsersModel.findOne({ where: { id } });

		if (!user.password) {
			return next(
				ApiError.badRequest("User does not exists or does not registered")
			);
		}

		await UsersModel.update({ role }, { where: { id } });

		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

exports.userData = async (req, res, next) => {
	try {
		const { id } = res.locals;
		const user = await UsersModel.findOne({ where: { id }});

		return res.json({
			id: user.id,
			phoneNumber: user.phoneNumber,
			role: user.role,
		});
	} catch (err) {
		next(err);
	}
}
