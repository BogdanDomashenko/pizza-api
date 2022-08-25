const {
	SizesModel,
	TypesModel,
	UserOrdersModel,
	ProductModel,
	PizzaOrdersModel,
} = require("../models/models");
const { parseOrderProps } = require("../utils/helpers/order");

exports.PizzaService = {
	async getPizzaSizes() {
		const sizes = await SizesModel.findAll();
		return sizes;
	},
	async getPizzaTypes() {
		const types = await TypesModel.findAll();
		return types;
	},
	async getPizzaSize(id) {
		const size = await SizesModel.findAll({ where: { id } });
		return size;
	},
	async getPizzaType(id) {
		const type = await TypesModel.findAll({ where: { id } });
		return type;
	},
	async getAdditionalPriceByProps(props) {
		const parsedProps = parseOrderProps(props);

		const type = await TypesModel.findOne({
			where: { name: parsedProps.type },
		});
		const size = await SizesModel.findOne({
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
