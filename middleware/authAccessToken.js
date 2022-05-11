const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

function authAccessToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      jwt.verify(
        authorization,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
          if (err) return next(ApiError.badRequest("Access token not valid"));
          res.locals.phoneNumber = user.phoneNumber;
          next();
        }
      );
    } else {
      return next(ApiError.badRequest("Token does not exist"));
    }
  } catch (error) {
    next(ApiError.badRequest("Access token error"));
  }
}

module.exports = authAccessToken;
