const mongoose = require("mongoose");

//Schema for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
