const bcryptjs = require("bcryptjs");
const hashPassword = (password) => {
  return bcryptjs.hashSync(password, Number(process.env.SALT_ROUNDS));
};
const comparePassword = (hashPassword, password) => {
  return bcryptjs.compareSync(hashPassword, password);
};
module.exports = { hashPassword, comparePassword };
