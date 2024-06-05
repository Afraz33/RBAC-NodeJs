const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/rolesModel");
async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //by default a user will register as a guest
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "guest",
  });

  try {
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
}

//if no admin exists, then by default roles for admin should be created
const createRoleIfNotExist = async (roleName, permissions) => {
  try {
    const existingRole = await Role.findOne({ name: roleName });
    if (!existingRole) {
      const newRole = new Role({
        name: roleName,
        permissions,
      });
      await newRole.save();
    }
  } catch (err) {
    throw new Error(`Error creating role: ${err.message}`);
  }
};

async function createAdmin(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount === 0) {
      const adminPermissions = [
        "read_role",
        "write_role",
        "delete_role, modify_role",
      ];

      //create a role for admin for the very first time an admin is created
      await createRoleIfNotExist("admin", adminPermissions);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  try {
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const payload = {
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

//this is to login as super admin, which has the authority to add admin users
async function loginAsSuperAdmin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const expectedEmail = process.env.SUPER_ADMIN_EMAIL;
    const expectedPassword = process.env.SUPER_ADMIN_PASSWORD;

    if (email !== expectedEmail || password !== expectedPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      email,
      role: "SUPER_ADMIN",
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports = {
  register,
  createAdmin,
  login,
  loginAsSuperAdmin,
};
