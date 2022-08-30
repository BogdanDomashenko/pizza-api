const { Client } = require("@elastic/elasticsearch");

const elasticsearchClient = new Client({
	cloud: {
		id: "pizza:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDYyZWMyYTI0MmM2MjQ0MTM5YzZlZmJjM2EzNWRlZGIyJDJlZmYyOGMzOTZhZDQyZWU4MWFjNDY5NWE3YjBmZmEx",
	},
	auth: {
		username: "elastic",
		password: "J2dsPgphVnTVJmpDiwLpNVYl",
	},
});

module.exports = elasticsearchClient;
