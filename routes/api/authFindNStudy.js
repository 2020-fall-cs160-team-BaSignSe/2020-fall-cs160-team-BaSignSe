const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/UserFindNStudy");
const bcrypt = require("bcryptjs");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    authenicate user + get token
// @access  Public
router.post(
  "/",
  [
    check("email", "please include valid eamil").isEmail(),
    check("password", "psw required").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.body);

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // same as {email : email}
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] }); // just an array of erros
      }

      // make sure pswd matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] }); // just an array of erros
      }

      // return the jsonwebtoken, once they register, so that they can use that token to authenicate and access protected routes
      // when making a GET request you have have a header that has key= x-auth-token value=<jswt>
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //res.send("User registered");
    } catch (err) {
      // something is wrong in the server
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

//module.exports = router;
