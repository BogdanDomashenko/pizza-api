const elasticsearchClient = require("../../../elasticseach");
const PizzaService = require("../../../services/PizzaService");

exports.savePizza = async (instance) => {
	console.log(PizzaService.getById(instance.id));
	/* 	return await elasticsearchClient.create({
		index: "pizzas",
		id: instance.dataValues.id,
		body: { name: instance.dataValues.name },
	}); */
};

exports.deletePizza = async (instance) => {
	console.log(PizzaService.getById(instance.id));
	/* 	return await elasticsearchClient.delete({
		index: "pizzas",
		id: instance.where.id,
	}); */
};

exports.updatePizza = async (instance) => {
	console.log(PizzaService.getById(instance.id));
	/* 	return await elasticsearchClient.update({
		index: "pizzas",
		id: instance.attributes.id,
		body: {
			doc: { name: instance.attributes.name },
		},
	}); */
};
