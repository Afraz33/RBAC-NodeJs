const {
  register,
  login,
  loginAsSuperAdmin,
  createAdmin,
} = require("../controllers/authController.js");

const { isSuperAdmin } = require("../middlewares/permissionMiddleware.js");

//Initializing router
const authRoutes = require("express").Router();

//auth routes
authRoutes.post("/signup", register);
authRoutes.post("/login", login);
authRoutes.post("/superadmin/login", loginAsSuperAdmin);

//login as a super admin
authRoutes.post("/admin", isSuperAdmin, createAdmin);

module.exports = authRoutes;
