const express = require("express");
const { ordersList } = require("../controllers/ordersController");
const authAccessToken = require("../middleware/authAccessToken");
const private = require("../middleware/private");
const router = express.Router();

router.get("/list", authAccessToken, private, ordersList);

module.exports = router;
