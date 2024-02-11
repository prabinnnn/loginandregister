const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types; // Fixed typo in 'ObjectId'
const blogSchema = new Schema({
  title: { type: String, required: true }, // Fixed typo in 'required'
  author: { type: [ObjectId], required: true }, // Fixed typo in 'required' and used singular 'ObjectId'
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = model("Blog", blogSchema);
