const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      message: "Missing token"
    });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
}

module.exports = {
  adminMiddleware
};