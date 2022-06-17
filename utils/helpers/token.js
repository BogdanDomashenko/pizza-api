const jwt = require("jsonwebtoken");

//change to 20m
exports.generateAccessToken = (obj) => {
	return jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
};

exports.generateRefreshToken = (obj) => {
	return jwt.sign(obj, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
