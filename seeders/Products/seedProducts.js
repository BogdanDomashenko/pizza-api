const {
	ProductModel,
	TypesModel,
	SizesModel,
	CategoryModel,
	ProductImage,
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
		Product_Images: [{ url: "https://i.ibb.co/937F4Sp/text-4-2.png" }],
		price: 12,
		categoryId: 1,
		rating: 6,
	},
	{
		id: 2,
		name: "Hawaiian",
		Product_Images: [{ url: "https://i.ibb.co/6NNfVVq/text-3-1.png" }],
		price: 15,
		categoryId: 1,
		rating: 10,
	},
	{
		id: 3,
		name: "Cesar",
		Product_Images: [{ url: "https://i.ibb.co/dpV67gp/text-2-1.png" }],
		price: 18,
		categoryId: 1,
		rating: 8,
	},
	{
		id: 4,
		name: "Bavarian",
		Product_Images: [{ url: "https://i.ibb.co/pZsNLQy/text-1.png" }],
		price: 10,
		categoryId: 1,
		rating: 10,
	},
	{
		id: 5,
		name: "Vegetables and mushrooms",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/30367198-f3bd-44ed-9314-6f717960da07.jpg",
			},
		],
		price: 12,
		categoryId: 1,
		rating: 7,
	},
	{
		id: 6,
		name: "Four seasons",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
			},
		],
		price: 13,
		categoryId: 1,
		rating: 10,
	},
	{
		id: 7,
		name: "Margarita",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
			},
		],
		price: 13,
		categoryId: 1,
		rating: 4,
	},
	{
		id: 8,
		name: "Pepperoni",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg",
			},
		],
		price: 17,
		categoryId: 1,
		rating: 9,
	},
	{
		id: 9,
		name: "Crazy pepperoni",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg",
			},
		],
		price: 15,
		categoryId: 1,
		rating: 2,
	},
	{
		id: 10,
		name: "Cheeseburger pizza",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
			},
		],
		price: 14,
		categoryId: 1,
		rating: 8,
	},
	{
		id: 11,
		name: "Sweet and sour chicken",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg",
			},
		],
		price: 11,
		categoryId: 1,
		rating: 2,
	},
	{
		id: 12,
		name: "Barbecue chicken",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
			},
		],
		price: 11,
		categoryId: 1,
		rating: 3,
	},
	{
		id: 13,
		name: "Cheese",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
			},
		],
		price: 10,
		categoryId: 1,
		rating: 6,
	},
	{
		id: 14,
		name: "Pepperoni Fresh with pepper",
		Product_Images: [
			{
				url: "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg",
			},
		],
		price: 20,
		categoryId: 1,
		rating: 4,
	},
];

exports.seedProducts = async () => {
	await CategoryModel.bulkCreate(categories);
	const createdSizes = await SizesModel.bulkCreate(types);
	const createdTypes = await TypesModel.bulkCreate(sizes);

	Products.forEach(async (product) => {
		const newProduct = await ProductModel.create(product, {
			include: ProductImage,
		});

		createdSizes.forEach((size) => {
			newProduct.addSize(size);
		});

		createdTypes.forEach((type) => {
			newProduct.addType(type);
		});
	});
};
