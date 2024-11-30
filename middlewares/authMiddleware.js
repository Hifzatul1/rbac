const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

const authMiddleware = {
  authenticate: async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Add user data to request
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
  },

  authorize: (requiredPermissions) => async (req, res, next) => {
    const user = await User.findById(req.user.id).populate("role");
    if (!user) return res.status(404).json({ message: "User not found" });

    const userPermissions = user.role.permissions;
    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.includes(perm)
    );

    if (!hasPermission)
      return res.status(403).json({ message: "Access Denied" });

    next();
  },
};

module.exports = authMiddleware;