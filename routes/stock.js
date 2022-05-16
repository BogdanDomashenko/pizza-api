const express = require("express");
const {
  aviablePizzas,
  allStockPizzas,
  setPizzaAvailable,
  setPizzaNotAvailable,
  setPizzaSizeAvailable,
  setPizzaTypeAvailable,
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
router.post(
  "/setPizzaSizeAvailable",
  authAccessToken,
  private,
  setPizzaSizeAvailable
);
router.post(
  "/setPizzaTypeAvailable",
  authAccessToken,
  private,
  setPizzaTypeAvailable
);

module.exports = router;
