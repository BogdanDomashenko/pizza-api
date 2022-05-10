const express = require("express");
const { checkoutOrder, getOrder } = require("../controllers/orderController");
const router = express.Router();

router.get("/:id", getOrder);
router.post("/checkout", checkoutOrder);

module.exports = router;
