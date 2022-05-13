const express = require("express");
const {
  checkoutOrder,
  getOrder,
  ordersList,
  updateOrder,
} = require("../controllers/orderController");
const authAccessToken = require("../middleware/authAccessToken");
const router = express.Router();

router.get("/:id", getOrder);
router.post("/checkout", checkoutOrder);
router.post("/update", updateOrder);

module.exports = router;
