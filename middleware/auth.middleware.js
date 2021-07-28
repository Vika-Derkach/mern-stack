const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (req, res, next) => {
  console.log("middleware");
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer Token"
    if (!token) {
      return res.status(401).json({ message: "There are no authorization" });
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "There are no authorization" });
  }
};
