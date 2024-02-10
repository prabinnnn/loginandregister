const { Schema, mdoel } = require("mongoose");
const { OjectId } = Schema.Types;
const blogSchema = new Schema({
  title: { type: String, reuired: true },
  author: { type: OjectId, require: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = new model("Blog", blogSchema);
