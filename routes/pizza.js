const express = require("express");
const {
  pizzaUpdate,
  pizzaSizes,
  pizzaTypes,
} = require("../controllers/pizzaController");
const authAccessToken = require("../middleware/authAccessToken");
const private = require("../middleware/private");
const router = express.Router();

router.post("/update", authAccessToken, private, pizzaUpdate);
router.get("/sizes", pizzaSizes);
router.get("/types", pizzaTypes);

module.exports = router;
