const express = require("express");
const { checkoutOrder, getOrder } = require("../controllers/orderController");
const router = express.Router();

router.get("/", getOrder);
router.get("/checkout", checkoutOrder);

module.exports = router;
