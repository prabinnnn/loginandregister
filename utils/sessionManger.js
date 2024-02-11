const { verifyJWT } = require("./token");
const checkRoles = (sysRoles) => {
  return (req, res, next) => {
    const token = req.header.token || "";
    if (!token) throw new Error("token is missing");
    const data = verifyJWT(token);
    if (!data) throw new Error("permission denied");
    const { data: user } = data;
    const isValidRoles = sysRoles.some((role) => user.roles.include(role));
    if (!isValidRoles) throw new Error("permissiong denied");
    next();
  };
};
module.exports = { checkRoles };
