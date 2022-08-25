const bcrypt = require("bcrypt");
const { ProductModel } = require("../../models/ProductModels");
const {
	UserModel,
	OrderModel,
	OrderProductsModel,
} = require("../../models/UserModels");
const { OrderSirvice } = require("../../services/OrderService");
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

	/* 	const product1 = await ProductModel.findOne({ where: { id: 1 } });
	const product2 = await ProductModel.findOne({ where: { id: 2 } });
	const product3 = await ProductModel.findOne({ where: { id: 3 } });

	const order = await OrderModel.create(
		{ UserId: 1, Products: [product1, product2, product3] },
		{ include: ProductModel }
	);
 */

	const products = await ProductModel.findAll();

	const mappedProducts = products.map((product) => ({
		...product.dataValues,
		count: 3,
		TypeId: 1,
		SizeId: 1,
	}));

	await OrderSirvice.create(mappedProducts, 1);
};
