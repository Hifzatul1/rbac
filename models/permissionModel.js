const mongoose = require('mongoose');

// Define the schema for permissions
const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;