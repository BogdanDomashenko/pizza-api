const express = require("express");
const {
	checkoutOrder,
	getOrder,
	updateOrder,
	orderList,
	userOrderList,
	phantomCheckoutOrder,
} = require("../controllers/orderController");
const authAccessToken = require("../middleware/authAccessToken");
const private = require("../middleware/private");
const router = express.Router();

router.get("/info/:id", getOrder);
router.post("/checkout", authAccessToken, checkoutOrder);
router.post("/phantom-checkout", phantomCheckoutOrder);
router.post("/update", authAccessToken, private, updateOrder);
router.get("/list", authAccessToken, private, orderList);
router.get("/list-by-user", authAccessToken, userOrderList);

module.exports = router;
