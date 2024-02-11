const router = require("express").Router();
const { checkRoles } = require("../../utils/sessionManger");
const userController = require("./user.controller");

// Register route
router.post("/register", async (req, res, next) => {
  try {
    const result = await userController.register(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

// Login route
router.post("/login", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

// Example of a role-restricted login route
router.get("/", checkRoles(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.getAll();
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.post("/generate-Fp-token", async (req, res, next) => {
  try {
    const result = await userController.generatefptoken(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.post("/verify-fp-token", async (req, res, next) => {
  try {
    const result = await userController.verifyFpToken(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.post("/reset-password", async (req, res, next) => {
  try {
    const result = await userController.resetPassword(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.post("/change-password", async (req, res, next) => {
  try {
    const result = await userController.changePassword(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
