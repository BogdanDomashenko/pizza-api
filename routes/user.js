const express = require("express");
const router = express.Router();
const { userList, setUserRole } = require("../controllers/userController");
const authAccessToken = require("../middleware/authAccessToken");
const private = require("../middleware/private");

router.get("/list", authAccessToken, private, userList);
router.post("/set-role", authAccessToken, private, setUserRole);

module.exports = router;
