const { getUser, updateUser } = require("../controllers/userController.js");
const { hasPermission } = require("../middlewares/permissionMiddleware.js");
//Initializing router
const userRoutes = require("express").Router();

//auth routes
userRoutes.get("/:id", hasPermission("read_record"), getUser);
userRoutes.put("/:id", hasPermission("update_record"), updateUser);

module.exports = userRoutes;
