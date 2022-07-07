const {
	SizesModel,
	TypesModel,
	SizePricesModel, TypePricesModel,
} = require("../models/models");
const { parseOrderProps } = require("../utils/helpers/order");

exports.PizzaService = {
	async getPizzaSizes() {
		const sizes = await SizesModel.findAll({ include: { model: SizePricesModel, attributes: ["price"] } });
		return sizes.map(({ id, name, sizePrice }) => ({ id, name, price: sizePrice && sizePrice.price }));
	},
	async getPizzaTypes() {
		const types = await TypesModel.findAll({ include: { model: TypePricesModel, attributes: ["price"] } });
		return types.map(({ id, name, typePrice }) => ({ id, name, price: typePrice && typePrice.price }));
	},
	async getPizzaSize(id) {
		const size = await SizesModel.findAll({ where: {id}, include: { model: SizePricesModel, attributes: ["price"] }, });
		return size;
		//return sizes.map(({ id, name, sizePrices }) => ({ id, name, price: sizePrices && sizePrices[0].price }));
	},
	async getPizzaType(id) {
		const type = await TypesModel.findAll({ where: {id}, include: { model: TypePricesModel, attributes: ["price"] } });
		return type;
		//return types.map(({ id, name, typePrices }) => ({ id, name, price: typePrices && typePrices[0].price }));
	},
	async getAdditionalPriceByProps(props) {
		const parsedProps = parseOrderProps(props);

		const type = await TypesModel.findOne({ where: { name: parsedProps.type }, attributes: [], include: { model: TypePricesModel, attributes: ["price"] } });
		const size = await SizesModel.findOne({ where: { name: parsedProps.size }, attributes: [], include: { model: SizePricesModel, attributes: ["price"] } });

		return (type.typePrice.price + size.sizePrice.price);
	}
}