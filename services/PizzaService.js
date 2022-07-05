const {
	SizesModel,
	TypesModel,
	SizePricesModel, TypePricesModel,
} = require("../models/models");

exports.PizzaService = {
	async getPizzaSizes() {
		const sizes = await SizesModel.findAll({ include: { model: SizePricesModel, attributes: ["price"] } });
		return sizes.map(({ id, name, sizePrices }) => ({ id, name, price: sizePrices && sizePrices[0].price }));
	},
	async getPizzaTypes() {
		const types = await TypesModel.findAll({ include: { model: TypePricesModel, attributes: ["price"] } });
		return types.map(({ id, name, typePrices }) => ({ id, name, price: typePrices && typePrices[0].price }));
	}
}