const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.get("/profile", authenticate, authorize(["read"]), userController.getProfile);

module.exports = router;