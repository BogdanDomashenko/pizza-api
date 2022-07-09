const express = require("express");
const {
  pizzaUpdate,
  pizzaSizes,
  pizzaTypes,
  addPizza,
  deletePizza,
  pizzaList,
} = require("../controllers/pizzaController");
const verifyRoles = require("../middleware/verifyRoles");
const { ROLES } = require("../utils/constants/userRolesConsts");
const router = express.Router();

router.post("/update", verifyRoles(ROLES.admin), pizzaUpdate);
router.get("/sizes", pizzaSizes);
router.get("/types", pizzaTypes);
router.post("/add", verifyRoles(ROLES.admin), addPizza);
router.get("/delete/:id", verifyRoles(ROLES.admin), deletePizza);
router.get("/list", pizzaList);

module.exports = router;
