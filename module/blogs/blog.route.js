const router = require("express").Router();
const blogController = require("./blog.controller");
router.get("/", async (req, res, next) => {
  try {
    const result = await blogController.getAll();
    res.json({ data: result });
  } catch (e) {
    next();
  }
});
module.exports = router;
