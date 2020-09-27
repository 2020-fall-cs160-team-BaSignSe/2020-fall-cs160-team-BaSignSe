const express = require("express");
const router = express.Router();

const User = require("../../models/User");

//@route GET api/users
//@desc GET All Users
//@access Public
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

//@route POST api/users
//@desc POST All Users
//@access Public
router.post("/", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

module.exports = router;
