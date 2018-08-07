const express     = require("express"),
      bodyParser  = require("body-parser"),
      path        = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Server started on Port 3000...");
});
