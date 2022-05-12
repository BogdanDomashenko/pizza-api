const express = require("express");
const { signIn, logout } = require("../controllers/authController");
const router = express.Router();

router.post("/signin", signIn);
router.get("/logout", logout);

module.exports = router;
