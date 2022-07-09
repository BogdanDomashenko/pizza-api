const express = require("express");
const {
	pizzaPopularity,
	salesBy,
} = require("../controllers/statisticsController");
const verifyRoles = require("../middleware/verifyRoles");
const { ROLES } = require("../utils/constants/userRolesConsts");
const router = express.Router();

router.get("/pizzas-sales", verifyRoles(ROLES.admin), pizzaPopularity);
router.get("/sales-by", verifyRoles(ROLES.admin), salesBy);

module.exports = router;
