const express = require("express");
const {
	pizzaPopularity,
	salesBy,
} = require("../controllers/statisticsController");
const authAccessToken = require("../middleware/authAccessToken");
const private = require("../middleware/private");
const router = express.Router();

router.get("/pizzas-sales", authAccessToken, private, pizzaPopularity);
router.get("/sales-by", authAccessToken, private, salesBy);

module.exports = router;
