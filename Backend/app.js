const express = require("express");
const app = express();
const cors = require("cors");
const userModel = require("./Modules/users");
const PostModel = require("./Modules/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(cookieparser());

app.get("/", function (req, res) {
  res.send("Hello ");
});

app.post("/register", async function (req, res) {
  let { name, email, password } = req.body;

  let exist = await userModel.findOne({ email: email });
  if (exist) {
    res.send("user Found");
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let user = await userModel.create({
          name,
          email,
          password: hash,
        });
        let token = jwt.sign({ email: email }, "aman");
        res.cookie("token", token);
        res.send(user);
      });
    });
  }
});

app.post("/Login", async function (req, res) {
  let { email, password } = req.body;

  let exist = await userModel.findOne({ email: email });
  if (exist) {
    bcrypt.compare(password, exist.password, function (err, result) {
      let token = jwt.sign({ email: email }, "aman");
      res.cookie("token", token);
      res.send("Login succes");
    });
  } else {
    res.send("user not Found");
  }
});

app.post("/Push", isLogedIn, async function (req, res) {
  let { content } = req.body;
  let user = await userModel.findOne({ email: req.user.email });

  const post = await PostModel.create({
    content,
    user: user._id,
  });

  await user.post.push(post._id);
  await user.save();
  res.redirect("http://localhost:5173/Profile");
});

app.get("/Profile", isLogedIn, async function (req, res) {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");

  if (!user) return res.status(404).send("User not found");

  res.json(user);
});

app.get("/Logout", async function (req, res) {
  res.cookie("token", "");
  res.redirect("http://localhost:5173/Login");
});

function isLogedIn(req, res, next) {
  if (!req.cookies || !req.cookies.token) {
    // Fix: Use req.cookies
    return res.status(401).send("You must be logged in");
  }

  try {
    let data = jwt.verify(req.cookies.token, "aman"); // Fix: Use req.cookies.token
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}

app.listen(3000, console.log("Server Started !"));
