const userModel = require("../users/user.model");
const blogModel = require("./blog.model");
const getAll = (payload) => {
  return userModel.find();
};
const updateById = (payload, id) => {
  try {
    const check = userModel.findOne({ _id });
    if (!check) throw new Error("conetnt dosent exit");
    if (update.title || update.content) {
      (update.title = payload.title) || (update.content = payload.content);
    }
    const { update: updatepost } = userModel.create();
    return updatepost;
  } catch (e) {
    next();
  }
};
const getById = () => {};
const create = () => {};
const removeById = () => {};
const bookmarks = (payload) => {
  const { users, blogs } = payload;
  if (!users.length > 0 || !blogs.length > 0)
    throw new Error("user or blogs dosent match ");
  return blogModel.create(payload);
};
const authBlog = () => {};
module.exports = {
  getAll,
  updateById,
  getById,
  create,
  removeById,
  bookmarks,
  authBlog,
};
