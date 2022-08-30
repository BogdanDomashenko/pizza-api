<<<<<<< HEAD:services/ProductService.js
const { SizeModel, TypeModel } = require("../models/ProductModels");
=======
const {
	SizesModel,
	TypesModel,
	UserOrdersModel,
	ProductModel,
	PizzaOrdersModel,
} = require("../models/models");
>>>>>>> upd:services/PizzaService.js
const { parseOrderProps } = require("../utils/helpers/order");

exports.ProductService = {
	async getProductSizes() {
		const sizes = await SizeModel.findAll();
		return sizes;
	},
	async getProductTypes() {
		const types = await TypeModel.findAll();
		return types;
	},
<<<<<<< HEAD:services/ProductService.js
	async getProductSize(id) {
		const size = await SizeModel.findAll({ where: { id } });
		return size;
	},
	async getProductType(id) {
		const type = await TypeModel.findAll({ where: { id } });
=======
	async getPizzaSize(id) {
		const size = await SizesModel.findAll({ where: { id } });
		return size;
	},
	async getPizzaType(id) {
		const type = await TypesModel.findAll({ where: { id } });
>>>>>>> upd:services/PizzaService.js
		return type;
	},
	async getAdditionalPriceByProps(props) {
		const parsedProps = parseOrderProps(props);

<<<<<<< HEAD:services/ProductService.js
		const type = await TypeModel.findOne({
			where: { name: parsedProps.type },
		});
		const size = await SizeModel.findOne({
=======
		const type = await TypesModel.findOne({
			where: { name: parsedProps.type },
		});
		const size = await SizesModel.findOne({
>>>>>>> upd:services/PizzaService.js
			where: { name: parsedProps.size },
		});
		return type.price + size.price;
	},
	async createOrder(userID, orderList) {
		const UserOrder = await UserOrdersModel.create({ userID });
		for (let order of orderList) {
			const additionalPrice = await this.getAdditionalPriceByProps(order.props);
			const Pizza = await ProductModel.findOne({
				where: { id: order.pizzaID },
			});
			const totalPrice = order.count * (Pizza.price + additionalPrice);
			const newOrder = await PizzaOrdersModel.create({
				orderID: UserOrder.id,
				...order,
				totalPrice,
			});
		}

		console.log(await PizzaOrdersModel.findAll({ where: { orderID: 99 } }));

		return UserOrder;
	},
};
