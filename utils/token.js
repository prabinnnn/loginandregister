const jwt = require("jsonwebtoken");
const signJWT = (payload) => {
  jwt.sign(
    {
      data: payload,
    },
    JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
};
const verifyJWT = (token) => {
  jwt.verify(token, JWT_SECRET);
};
const generateRandomToken = () => {
  return Math.floor(100000 + math.round() + 900000);
};
module.exports = { signJWT, verifyJWT, generateRandomToken };
