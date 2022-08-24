require("dotenv").config();
const sequelize = require("../db");
const { seedProducts } = require("./Products/seedProducts");

const seed = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();

		seedProducts();
	} catch (e) {
		console.log(e);
	}
};

seed();
