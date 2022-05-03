var express = require("express");
const { pizzasList } = require("../controllers/pizzasController");
var router = express.Router();

/* GET users listing. */
router.get("/list", pizzasList);

module.exports = router;
