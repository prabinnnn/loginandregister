const { verifyJWT } = require("./token");

const checkRoles = (sysRoles) => {
  return (req, res, next) => {
    const token = req.headers.token || "";
    if (!token) throw new Error("token is missing");

    const data = verifyJWT(token);
    if (!data) throw new Error("permission denied");

    const { data: user } = data;
    const isValidRole = sysRoles.some((role) => user.roles.includes(role));
    if (!isValidRole) throw new Error("permission denied");

    next();
  };
};

module.exports = { checkRoles };
