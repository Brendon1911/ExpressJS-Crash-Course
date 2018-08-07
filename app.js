const express           = require("express"),
      bodyParser        = require("body-parser"),
      path              = require("path"),
      expressValidator  = require("express-validator");

const app = express();

// const logger = function (req, res, next) {
//   console.log("Logging...");
//   next();
// }

// app.use(logger);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, "public")));

// Global Vars
app.use((req, res, next) => {
  res.locals.errors = null;
  next();
});

// express validator middleware
app.use(expressValidator());

let users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com"
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bobsmith@gmail.com"
  },
  {
    id: 3,
    firstName: "Jill",
    lastName: "Jackson",
    email: "jilljackson@gmail.com"
  }
]

app.get("/", (req, res) => {
  res.render("index", { 
    title: "Customers",
    users: users
  });
});

app.post("/users/add", (req, res) => {
  req.checkBody("firstName", "First Name is required").notEmpty();
  req.checkBody("lastName", "Last Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render("index", { 
      title: "Customers",
      users: users,
      errors: errors
    });
  } else {
    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
    console.log("Success!");
  }
});

app.listen(3000, () => {
  console.log("Server started on Port 3000...");
});
