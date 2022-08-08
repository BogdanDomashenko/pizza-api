const { CallBacksModel, UsersModel } = require("../models/models");
const { ROLES } = require("../utils/constants/userRolesConsts");

exports.addCallBack = async (req, res, next) => {
	try {
		const { phoneNumber } = req.body;

		let User = await UsersModel.findOrCreate({
			where: { phoneNumber },
			defaults: { phoneNumber },
		});

		await CallBacksModel.findOrCreate({
			where: { userID: User[0].id },
			defaults: { userID: User[0].id },
		});

		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

exports.callBacksList = async (req, res, next) => {
	try {
		const list = await CallBacksModel.findAll();

		return res.json(list);
	} catch (err) {
		next(err);
	}
};

exports.deleteCallBack = async (req, res, next) => {
	try {
		const { id } = req.params;

		await CallBacksModel.destroy({ where: { id } });

		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};
