const Role = require("../models/rolesModel");

async function createRole(req, res) {
  const { name, permissions } = req.body;

  if (!name || !permissions.length) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(409).json({ message: "Role already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }

  const newRole = new Role({
    name,
    permissions,
  });

  try {
    const savedRole = await newRole.save();
    res
      .status(201)
      .json({ message: "Role created successfully", role: savedRole });
  } catch (err) {
    return res.status(500).json({ message: "Error creating role" });
  }
}

async function getRoleByName(req, res) {
  const { roleName } = req.params;

  try {
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ role });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error getting role", error: err.message });
  }
}

async function getAllRoles(req, res) {
  try {
    const roles = await Role.find();
    res.status(200).json({ roles });
  } catch (err) {
    return res.status(500).json({ message: "Error getting roles" });
  }
}

async function updateRole(req, res) {
  const roleName = req.params.roleName;
  const updates = req.body;

  // Allowed updates check that what needs to be updated for the role, i.e., role name or permissions for the role
  const allowedUpdates = ["name", "permissions"];

  const isValidUpdate = Object.keys(updates).every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).json({ message: "Invalid update fields" });
  }

  try {
    const role = await Role.findOne({ name: roleName });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Update role name if provided
    if (updates.name) {
      role.name = updates.name;
    }

    // Update permissions if provided
    if (updates.permissions) {
      const { permissions } = updates;

      // Add new permissions and avoid duplicates
      if (permissions.add) {
        role.permissions = Array.from(
          new Set([...role.permissions, ...permissions.add])
        );
      }

      // Remove specified permissions
      if (permissions.delete) {
        role.permissions = role.permissions.filter(
          (perm) => !permissions.delete.includes(perm)
        );
      }
    }

    const updatedRole = await role.save();

    res
      .status(200)
      .json({ message: "Role updated successfully", role: updatedRole });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating role", error: err.message });
  }
}

async function deleteRole(req, res) {
  const roleName = req.params.roleName;

  try {
    const decodedRole = req.user?.role;

    if (roleName.toLowerCase() === "admin" && decodedRole !== "SUPER_ADMIN") {
      return res.status(401).json({
        message:
          "Unauthorized: Deleting admin role requires SUPER_ADMIN privilege",
      });
    }

    const role = await Role.findOneAndDelete({ name: roleName });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports = {
  createRole,
  getAllRoles,
  updateRole,
  deleteRole,
  getRoleByName,
};
