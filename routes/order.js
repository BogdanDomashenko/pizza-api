const express = require("express");
const {
  checkoutOrder,
  getOrder,
  updateOrder,
  orderList,
} = require("../controllers/orderController");
const authAccessToken = require("../middleware/authAccessToken");
const private = require("../middleware/private");
const router = express.Router();

router.get("/info/:id", getOrder);
router.post("/checkout", checkoutOrder);
router.post("/update", authAccessToken, private, updateOrder);
router.get("/list", authAccessToken, private, orderList);

module.exports = router;
