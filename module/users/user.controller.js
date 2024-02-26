const { query } = require("express");
const { hashPassword, comparePassword } = require("../../utils/bcryptjs");
const { mailer } = require("../../utils/mailer");
const { signJWT, generateRandomToken } = require("../../utils/token");
const { updateOne } = require("../blogs/blog.model");
const userModel = require("./user.model");
const register = async (payload) => {
  delete payload.email;
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
  const user = await userModel
    .findOne({ email, isActive: true })
    .select("+password");
  if (!user) throw new Error("user doesnt exits");
  const { password: hashPw } = user;
  const result = comparePassword(password, hashPw);
  if (!result) throw new Error("password doesnt matchh please try again");
  const signingData = { name: user.name, email: user.email, roles: user.roles };
  const token = signJWT(signingData);
  return token;
};

const getById = (_id) => {
  return userModel.findOne({ _id });
};
const getAll = async (search, page = 1, limit = 20) => {
  const query = [];
  if (search?.name) {
    query.push({
      $match: {
        name: new ReqExp(serach?.name, "gi"),
      },
    });
  }

  if (search?.email) {
    query.push({
      $match: {
        name: new ReqExp(serach?.email, "gi"),
      },
    });
  }
  if (search?.phone) {
    query.push({
      $match: {
        name: new ReqExp(serach?.phone, "gi"),
      },
    });
  }
  query.push({
    $facet: {
      metadata: [
        {
          $count: "total",
        },
      ],
      data: [
        {
          $skip: (+page - 1) * +limit,
        },
        {
          $limit: +limit,
        },
      ],
    },
  });
};
{
  $addFields: {
    total: {
      $arrayElement: ["metadata", 0];
    }
  }
}
{
  $project: {
    metadata: 0;
  }
}
const result = await userModel.aggreatate(query);
{
  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
}
const updateById = (_id, payload) => {
  return userModel.updateOne({ _id }, payload);
};

const generatefptoken = async (payload) => {
  const { email } = payload;
  if (!email) throw new Error("email is missing");
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("user dosent exits");
  const randomToken = generateRandomToken();
  await userModel.updateOne({ email }, { token: randomToken });
  const isEmailSent = await mailer(
    user.email,
    "forget Password",
    `your token is ${randomToken}`
  );
  if (isEmailSent) return `forget password token sent succefully`;
};
const verifyFpToken = async (payload) => {
  const { token, password, email } = payload;
  if (!token || !password || !email)
    throw new Error("Token, password, or email is missing");
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");
  const { token: verifyToken } = user;
  if (token !== verifyToken) throw new Error("Token is mismatching");
  await userModel.updateOne(
    { email },
    { password: hashPassword(password), token: "" }
  );
  return "Password updated successfully";
};
const resetPassword = (payload) => {
  const { password, userId } = payload;
  if (!password || !userId) throw new Error("password or userid doesnt match");
  return userModel.updateOne(
    { _id: userId },
    { password: hashPassword(password) }
  );
};
const changePassword = async (payload) => {
  const { userId, oldPassword, newPassword } = payload;
  if (!userId || !oldPassword || newPassword)
    throw new Error("something missing");
  const user = await userModel.findOne({ user: userId }).select("+password");
  if (!user) throw new Error("user is missing");
  const isValidOldPassword = comparePassword(oldPassword, user.password);
  if (!isValidOldPassword) throw new Error("password didnt match");
  await updateOne({ _id: userId }, { password: hashPassword(newPassword) });
  return `password successfully updated`;
};
const create = (payload) => {
  return userModel.create(payload);
};
const getProfile = async (_id) => {
  return userModel.findOne({ _id });
};
const updateProfile = async ({ _id }, payload) => {
  delete payload.email;
  return userModel.findOne({ _id }, payload);
};
const blockUser = async (_id) => {
  const user = await userModel.findOne({ _id });
  if (!user) throw new Error("User is not found");
  const payload = { isActive: !user.isActive };
  return userModel.updateOne({ _id }, payload);
};
module.exports = {
  login,
  blockUser,
  getProfile,
  updateProfile,
  register,
  getAll,
  getById,
  updateById,
  changePassword,
  resetPassword,
  generatefptoken,
  verifyFpToken,
  create,
};
