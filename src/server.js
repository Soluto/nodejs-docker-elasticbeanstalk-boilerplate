const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const greet = require("./modules/greetings/greet");
const v1Router = require("./routers/v1/v1Router");

app.use("/api/v1", v1Router);

app.get("/", (req, res) => {
  res.status(200).send(greet());
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
