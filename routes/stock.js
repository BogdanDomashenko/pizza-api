const express = require("express");
const {
  aviablePizzas,
  allStockPizzas,
  setPizzaAvailable,
  setPizzaNotAvailable,
  setPizzaSizeAvailable,
  setPizzaTypeAvailable,
} = require("../controllers/stockController");
const verifyRoles = require("../middleware/verifyRoles");
const { ROLES } = require("../utils/constants/userRolesConsts");
const router = express.Router();

router.get("/aviablePizzas", aviablePizzas);
router.get("/allPizzas", allStockPizzas);
router.get(
  "/setPizzaAvailable/:id",
  verifyRoles(ROLES.admin),
  setPizzaAvailable
);
router.get(
  "/setPizzaNotAvailable/:id",
  verifyRoles(ROLES.admin),
  setPizzaNotAvailable
);
router.post(
  "/setPizzaSizeAvailable",
  verifyRoles(ROLES.admin),
  setPizzaSizeAvailable
);
router.post(
  "/setPizzaTypeAvailable",
  verifyRoles(ROLES.admin),
  setPizzaTypeAvailable
);

module.exports = router;
