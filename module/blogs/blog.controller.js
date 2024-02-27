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
const getById = async (_id, payload) => {
  const { email, name } = payload;
  if (!email || !name) throw new Error("user doesnt exit");
  const result = await userModel.findOne({ users });
  if (!result) throw new Error("user sccount doesnt exit");
  return result;
};
const create = (payload) => {
  return userModel.create(payload);
};
const removeById = async (_id, payload) => {
  const result = await userModel.findOne({ _id });
  if (!result) throw new Error("id dosenot exit");
  const removepost = await userModel.Remove(_id);
  if (!removepost) throw new Error("blog doesnt exit");
  return removepost;
};
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
