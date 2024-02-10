const { Schema, mdoel } = require("mongoose");
const { ObjectId } = Schema.Types;
const bookmarkSchema = new Schema({
  users: { type: [ObjectId], required: true, ref: "User" },
  blogs: { type: [ObjectId], required: true, ref: "Blog" },
});
module.exports = new model("Bookmark", bookmarkSchema);
