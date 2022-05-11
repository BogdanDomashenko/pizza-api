exports.access = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      jwt.verify(
        authorization,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
          if (err) return next("Access token not valid");
          return res.send(req.session.refreshToken);
        }
      );
    } else {
      next("token does not exist");
    }
  } catch (e) {
    next("Access token error");
  }
};

exports.refresh = (req, res, next) => {
  try {
    if (req.cookies.refreshToken) {
      jwt.verify(
        req.cookies.refreshToken || " ",
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.sendStatus(401);

          const { email, password } = user;
          const data = { email, password };

          const accessToken = tokenUtil.generateAccessToken(data);
          const refreshToken = tokenUtil.generateRefreshToken(data);

          res.cookie("refreshToken", refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          res.set("Authorization", accessToken);
          res.sendStatus(201);
        }
      );
    } else {
      next("token does not exist");
    }
  } catch (e) {
    next("Token refresh error");
  }
};
