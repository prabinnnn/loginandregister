const router = require("express").Router();
const blogRouter = require("../module/blogs/blog.route");
const userRouter = require("../module/users/user.route");
router.use("/api/v1/users", userRouter);
router.use("/api/v2/blogs", blogRouter);
module.exports = router;
