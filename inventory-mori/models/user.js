const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UsersSchema);
