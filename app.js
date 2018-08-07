const express           = require("express"),
      bodyParser        = require("body-parser"),
      path              = require("path"),
      expressValidator  = require("express-validator"),
      mongojs           = require("mongojs");

const ObjectId = mongojs.ObjectId;
const db = mongojs("mongodb://brendon:password123@ds123259.mlab.com:23259/express_js-crash-course", ["users"]);

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

app.get("/", (req, res) => {
  db.users.find((err, docs) => {
    console.log(docs);
    res.render("index", { 
      title: "Customers",
      users: docs
    });
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
    db.users.insert(newUser, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
});

app.delete("/users/delete/:id", (req, res) => {
  db.users.remove({_id: ObjectId(req.params.id)}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on Port 3000...");
});
