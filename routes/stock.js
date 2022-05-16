const express = require("express");
const {
  aviablePizzas,
  allStockPizzas,
  setPizzaAvailable,
  setPizzaNotAvailable,
} = require("../controllers/stockController");
const authAccessToken = require("../middleware/authAccessToken");
const private = require("../middleware/private");
const router = express.Router();

router.get("/aviablePizzas", aviablePizzas);
router.get("/allPizzas", allStockPizzas);
router.get(
  "/setPizzaAvailable/:id",
  authAccessToken,
  private,
  setPizzaAvailable
);
router.get(
  "/setPizzaNotAvailable/:id",
  authAccessToken,
  private,
  setPizzaNotAvailable
);

module.exports = router;
