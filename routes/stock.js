const express = require("express");
const { aviablePizzas } = require("../controllers/stockController");
const router = express.Router();

router.get("/aviablePizzas", aviablePizzas);

module.exports = router;
