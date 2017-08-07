const { Router } = require("express");
const isAliveRouter = require("./isAliveRouter");

const router = new Router();
router.use("/isAlive", isAliveRouter);

module.exports = router;