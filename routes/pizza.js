const express = require("express");
const {
  pizzaUpdate,
  pizzaSizes,
  pizzaTypes,
  addPizza,
  deletePizza,
  pizzaList,
} = require("../controllers/pizzaController");
const authAccessToken = require("../middleware/authAccessToken");
const private = require("../middleware/private");
const router = express.Router();

router.post("/update", authAccessToken, private, pizzaUpdate);
router.get("/sizes", pizzaSizes);
router.get("/types", pizzaTypes);
router.post("/add", authAccessToken, private, addPizza);
router.get("/delete/:id", authAccessToken, private, deletePizza);
router.get("/list", pizzaList);

module.exports = router;
