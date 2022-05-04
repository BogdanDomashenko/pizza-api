const express = require("express");
const { pizzasList } = require("../controllers/pizzasController");
const router = express.Router();

router.get("/list", pizzasList);

module.exports = router;
