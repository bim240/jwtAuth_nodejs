var express = require("express");
var router = express.Router();
var User = require("../models/user");
var auth = require("../authentication/auth");
var jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res, next) => {
  try {
    var newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json("user not created");
  }
});

router.get("/login", async (req, res, next) => {
  var { email, password } = req.body;
  // console.log(req.body);
  try {
    var user = await User.findOne({ email });
    // console.log(user);
    if (!user) return res.json({ error: "email invalid" });
    var match = await user.verifyPassword(password);
    if (!match) return res.json({ error: "password does not match" });
    //jwt token auth
    // var payload = { UserId: user.id, email: user.email };
    // var token = await jwt.sign(payload, process.env.SECRET);
    var token = auth.generateJWT(user);
    // console.log(user);
    res.json({ success: "true", token });
    // next();
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/profile", auth.verifyToken, async (req, res) => {
  try {
    var user = await User.findById(req.user.UserId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ msg: "User not found" });
  }
});
module.exports = router;
