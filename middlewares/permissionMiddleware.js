const Role = require("../models/rolesModel");
const jwt = require("jsonwebtoken");

function hasPermission(requiredPermission) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check for missing or invalid authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = { role: decoded.role, email: decoded.email };

      const foundRole = await Role.findOne({ name: req.user.role });
      if (!foundRole) {
        return res.status(403).json({ message: "Invalid role" });
      }

      if (!foundRole.permissions.includes(requiredPermission)) {
        return res.status(403).json({
          message: `Insufficient permissions. Required permission: ${requiredPermission}`,
        });
      }

      // Permission granted, call next() to continue request processing
      next();
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(500).json({ message: err.message });
      }
    }
  };
}

async function isSuperAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.role !== "SUPER_ADMIN") {
      return res
        .status(403)
        .json({ message: "Insufficient permissions: Super Admin required" });
    }

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = { hasPermission, isSuperAdmin };
