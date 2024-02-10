const blogModel = require("./blog.model");
const getAll = () => {};
const updateById = () => {};
const getById = () => {};
const create = () => {};
const removeById = () => {};
const bookmarks = (payload) => {
  const { users, blogs } = payload;
  if (!users || !blogs) throw new Error("user or blogs dosent match ");
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
