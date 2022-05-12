const express = require("express");
const { ordersList } = require("../controllers/ordersController");
const authAccessToken = require("../middleware/authAccessToken");
const router = express.Router();

router.get("/list", authAccessToken, ordersList);

module.exports = router;