const express = require("express");
const { signIn, test } = require("../controllers/authController");
const router = express.Router();

router.post("/signin", signIn);

module.exports = router;
