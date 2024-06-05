const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  //permissions assoicated with role
  permissions: {
    type: Array,

    default: [],
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
