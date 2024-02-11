const { hashPassword, comparePassword } = require("../../utils/bcryptjs");
const { mailer } = require("../../utils/mailer");
const { signJWT, generateRandomToken } = require("../../utils/token");
const userModel = require("./user.model");
const register = async (payload) => {
  payload.password = hashPassword(payload.password);
  const user = await userModel.create(payload);
  if (!user) throw new Error("user doesnt match,please type again");
  const result = await mailer(
    user.email,
    "user signup",
    "user register successfully"
  );
  if (result) throw new Error("user registration successfully");
  return "user registration failed";
};
const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error("user or email doesnt exit");
  const user = userModel.findOne({ email }).select("+password");
  if (!user) throw new Error("user doesnt exits");
  const { password: hashPw } = user;
  const result = comparePassword(hashPw, password);
  if (!result) throw new Error("password doesnt matchh please try again");
  const signingData = { name: user.name, email: user.email, roles: user.roles };
  const token = await signJWT(signingData);
  return token;
};
const getAll = () => {};
const getById = (_id) => {
  return userModel.findOne({ _id });
};
const updateById = (_id, payload) => {
  return userModel.updateOne({ _id }, payload);
};
const changePassword = () => {};
const resetPassword = (payload) => {
  const { password, userId } = payload;
  if (!password || !userId) throw new Error("password or userid doesnt match");
  return userModel.updateOne(
    { _id: userId },
    { password: hashPassword(password) }
  );
};
const generatefptoken = async (payload) => {
  const { email } = payload;
  if (!email) throw new Error("email is missing");
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("user dosent exits");
  const randomToken = generateRandomToken();
  await userModel.updateOne({ email }, { token });
  const isEmailSent = await mailer(
    user.mail,
    "forget Password",
    `your token is ${randomToken}`
  );
  if (isEmailSent) return `forget password token sent succefully`;
};
const verifyFpToken = async (payload) => {
  const { token, password, email } = payload;
  if (!token || !password || !email)
    throw new Error("token or password or email is missing");
  const user = userModel.findOne({ email });
  if (!user) throw new Error("user is missing");
  const { token: verifyToken } = user;
  if (token !== verifyToken) throw new Error("token is missmatching");
  const updateUser = await userModel.updateOne(
    { email },
    { password: hashPassword(password), token: "" }
  );
  return "token is send successfully";
};
module.exports = {
  login,
  register,
  getAll,
  getById,
  updateById,
  changePassword,
  resetPassword,
  generatefptoken,
  verifyFpToken,
};
