const {
  createRole,
  updateRole,
  deleteRole,
  getAllRoles,
  getRoleByName,
} = require("../controllers/roleController.js");
const { hasPermission } = require("../middlewares/permissionMiddleware.js");
//Initializing router
const adminRoutes = require("express").Router();

//admin routes
adminRoutes.post("/role", hasPermission("write_role"), createRole);
adminRoutes.get("/roles", hasPermission("read_role"), getAllRoles);
adminRoutes.get("/role/:roleName", hasPermission("read_role"), getRoleByName);
adminRoutes.put("/role/:roleName", hasPermission("update_role"), updateRole);
adminRoutes.delete("/role/:roleName", hasPermission("delete_role"), deleteRole);
module.exports = adminRoutes;
