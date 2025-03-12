const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ error: "You Must SIGN IN To Access This Resource." });
  }
  next();
};

exports.isSeller = (req, res, next) => {
  let user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

  if (!user.isSeller) {
    return res
      .status(400)
      .json({ error: "YOU MUST BE ADMIN TO ACCESS THIS RESOURCE" });
  }
  next();
};
