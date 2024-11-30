const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }] // Array of permission names
});

module.exports = mongoose.model("Role", roleSchema);