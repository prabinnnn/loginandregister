const router = require("express").Router();
const blogRouter = require("");
const userRouter = require("");
router.use("/api/v1/users", userRouter);
router.use("/api/v2/blogs", blogRouter);
module.exports = router;
