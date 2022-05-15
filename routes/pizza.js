const express = require("express");
const { pizzaUpdate } = require("../controllers/pizzaController");
const authAccessToken = require("../middleware/authAccessToken");
const private = require("../middleware/private");
const router = express.Router();

router.post("/update", authAccessToken, private, pizzaUpdate);

module.exports = router;
