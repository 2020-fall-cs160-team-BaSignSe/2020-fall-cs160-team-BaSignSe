//this file checks if we have the header (for); if have header, it compared it with the jwt token via the try and catch block
//jwt token repreesnts the user

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");
  // check if no tokenk
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
