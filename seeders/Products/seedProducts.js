const {
	ProductModel,
	TypesModel,
	SizesModel,
	CategoryModel,
} = require("../../models/models");

const categories = [
	{ id: 1, name: "Pizzas" },
	{ id: 2, name: "Drinks" },
	{ id: 3, name: "Snacks" },
];

const types = [
	{ id: 1, name: "tiny", price: 0 },
	{ id: 2, name: "default", price: 2 },
];
const sizes = [
	{ id: 1, name: "10", price: 0 },
	{ id: 2, name: "12", price: 2 },
	{ id: 3, name: "16", price: 4 },
];

const Products = [
	{
		id: 1,
		name: "White chiken",
		imageUrl: "https://i.ibb.co/937F4Sp/text-4-2.png",
		price: 12,
		categoryId: 1,
		rating: 10,
	},
	{
		id: 2,
		name: "Test",
		imageUrl: "https://i.ibb.co/937F4Sp/text-4-2.png",
		price: 10,
		categoryId: 1,
		rating: 10,
	},
	{
		id: 3,
		name: "Test2",
		imageUrl: "https://i.ibb.co/937F4Sp/text-4-2.png",
		price: 8,
		categoryId: 1,
		rating: 10,
	},
];

exports.seedProducts = async () => {
	const createdCategories = await CategoryModel.bulkCreate(categories);
	const createdSizes = await SizesModel.bulkCreate(types);
	const createdTypes = await TypesModel.bulkCreate(sizes);

	Products.forEach(async (product) => {
		const newProduct = await ProductModel.create(product);

		createdSizes.forEach((size) => {
			newProduct.addSize(size);
		});

		createdTypes.forEach((type) => {
			newProduct.addType(type);
		});
	});
};
