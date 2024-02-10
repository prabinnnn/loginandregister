const router = require("express").Router();
const usercontroller = require("./user.controller");
router.post("/register", async (req, res, next) => {
  try {
    const result = await usercontroller.register(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const result = await usercontroller.login(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
