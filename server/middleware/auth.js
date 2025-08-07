const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Session expired. Please log in again." });
  }
};
