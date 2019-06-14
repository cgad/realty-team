const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    phone: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
