const { Schema, mdoel } = require("mongoose");
const userSchema = new Schema({
  name: { type: String, reuired: true },
  email: { type: String, unquie: true, required: true },
  password: { type: String, required: true, select: false },
  phoneno: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = new model("User", userSchema);
