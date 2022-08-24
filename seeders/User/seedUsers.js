const bcrypt = require("bcrypt");
const { ProductModel } = require("../../models/ProductModels");
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

	const product = await ProductModel.findOne({ where: { id: 1 } });
	const order = await OrderModel.create({ UserId: user.id });
	await order.addProduct(product);

	console.log(order);
};
