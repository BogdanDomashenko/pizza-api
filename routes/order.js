const express = require("express");
const {
  checkoutOrder,
  getOrder,
  ordersList,
} = require("../controllers/orderController");
const authAccessToken = require("../middleware/authAccessToken");
const router = express.Router();

router.get("/:id", getOrder);
router.post("/checkout", checkoutOrder);

module.exports = router;
