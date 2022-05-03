var express = require("express");
const { aviablePizzas } = require("../controllers/stockController");
var router = express.Router();

router.get("/aviablePizzas", aviablePizzas);

module.exports = router;
