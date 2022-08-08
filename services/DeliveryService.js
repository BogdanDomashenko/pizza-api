const { DeliveryModel } = require("../models/models");

exports.DeliveryService = {
	async getPrice() {
		const delivery = await DeliveryModel.findOne({ where: { id: 1 } });
		console.log(delivery)

		return delivery.price;
	},
	async setPrice(price) {
		return await DeliveryModel.update({ price }, { where: { id: 1 } });
	}
}