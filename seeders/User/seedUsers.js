const bcrypt = require("bcrypt");
const { UserModel, OrderModel } = require("../../models/UserModels");
const { ORDER_STATUSES } = require("../../utils/constants/orderStatusesConsts");
const { ROLES } = require("../../utils/constants/userRolesConsts");

exports.seedUsers = async () => {
	const hashedPassword = await bcrypt.hash("test", 3);
	const user = await UserModel.create({
		id: 1,
		phoneNumber: "11111111111",
		password: hashedPassword,
		role: ROLES.admin,
	});

	const order = await OrderModel.create({ userId: user.id });

	console.log(order);
};
