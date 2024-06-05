//  ===============> Importing modules for project setup  <================
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");

//  ===============> Importing user routes <================
// const roleRoutes = require("./routes/roleRoutes");
// const permissionRoutes = require("./routes/permissionRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
// Configurations
dotenv.config();
const app = express();

// App Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
module.exports = app;
