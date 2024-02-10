const { hashPassword, comparePassword } = require("../../utils/bcryptjs");
const userModel = require("./user.model");
const register = (payload) => {
  password.payload = hashPassword(password.payload);
  const user = userModel.create(payload);
  if (!user) throw new error("user doent match");

  return result;
};
const login = (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error("user or email doesnt exit");
  const user = userModel.findOne({ email }).select("+password");
  if (!user) throw new error("user doesnt exits");
  const { password: hashPw } = user;
  const result = comparePassword(hashPw, password);
  return result;
};
const getAll = () => {};
const getById = () => {};
const updateById = () => {};
const changePassword = () => {};
const resetPassword = () => {};
const forgetPassword = () => {};
module.exports = {
  login,
  register,
  getAll,
  getById,
  updateById,
  changePassword,
  resetPassword,
  forgetPassword,
};
