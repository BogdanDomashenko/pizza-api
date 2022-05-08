const express = require("express");
const { checkoutOrder, getOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/", getOrder);
router.post("/checkout", checkoutOrder);

module.exports = router;
