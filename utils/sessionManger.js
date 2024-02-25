const { verifyJWT } = require("./token");
const userModel = require("../module/users/user.model");
const checkRoles = (sysRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.token || "";
      if (!token) throw new Error("token is missing");
      const data = verifyJWT(token);
      if (!data) throw new Error("permission denied");
      const { data: user } = data;
      const { email } = user;
      const userData = await userModel.findOne({ email, isActive: true });
      if (!userData) throw new Error("User is not found");
      const isValidRole = sysRoles.some((role) => user.roles.includes(role));
      if (!isValidRole) throw new Error("permission denied");
      req.currentUser = userData._id;
      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = { checkRoles };
