const express = require("express");
const { userList, setUserRole } = require("../controllers/userController");
const router = express.Router();

router.get("/list", userList);
router.post("/set-role", setUserRole);

module.exports = router;
