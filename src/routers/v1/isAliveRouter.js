const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;