const express = require("express");
const {
	pizzaUpdate,
	pizzaSizes,
	pizzaTypes,
	addPizza,
	deletePizza,
	pizzaList,
	updateType,
	updateSize,
	addSize,
	addType,
	deleteType,
	deleteSize,
} = require("../controllers/productController");
const verifyRoles = require("../middleware/verifyRoles");
const { ROLES } = require("../utils/constants/userRolesConsts");
const router = express.Router();

router.post("/update", verifyRoles(ROLES.admin), pizzaUpdate);
router.get("/sizes", pizzaSizes);
router.get("/types", pizzaTypes);
router.post("/add", verifyRoles(ROLES.admin), addPizza);
router.get("/delete/:id", verifyRoles(ROLES.admin), deletePizza);
router.get("/list", pizzaList);
router.post("/update-type", verifyRoles(ROLES.admin), updateType);
router.post("/update-size", verifyRoles(ROLES.admin), updateSize);
router.post("/add-size", verifyRoles(ROLES.admin), addSize);
router.post("/add-type", verifyRoles(ROLES.admin), addType);
router.post("/delete-size", verifyRoles(ROLES.admin), deleteSize);
router.post("/delete-type", verifyRoles(ROLES.admin), deleteType);

module.exports = router;
