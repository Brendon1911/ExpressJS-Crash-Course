const express     = require("express"),
      bodyParser  = require("body-parser"),
      path        = require("path");

const app = express();

// const logger = function (req, res, next) {
//   console.log("Logging...");
//   next();
// }

// app.use(logger);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Server started on Port 3000...");
});
