const express = require("express");
const {
	callBacksList,
	addCallBack,
} = require("../controllers/callBacksController");
const verifyRoles = require("../middleware/verifyRoles");
const { ROLES } = require("../utils/constants/userRolesConsts");
const router = express.Router();

router.get("/list", verifyRoles(ROLES.admin), callBacksList);
router.post("/add", addCallBack);

module.exports = router;
