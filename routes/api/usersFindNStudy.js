const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const UserFindNStudy = require("../../models/UserFindNStudy");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   POST api/usersFindNStudy
// @desc    register user
// @access  Public
router.post(
  "/",
  [
    check("firstName", "First Name is required").not().isEmpty(), // want it to be there not empty
    check("lastName", "Last Name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("email", "please include valid eamil").isEmail(),
    check("password", "Please enter a password w/ 6 or more chars").isLength({
      ming: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.body);

    const { firstName, lastName, username, email, password } = req.body;

    try {
      // See if the user exists
      // if user exists send back error b/c we don't want multiple emails

      let user = await UserFindNStudy.findOne({ email }); // same as {email : email}
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User alrrady exists" }] }); // just an array of erros
      }

      user = new UserFindNStudy({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      // NOTE: anything that returns a promise you need to out await in front of it
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return the jsonwebtoken, once they register, so that they can use that token to authenicate and access protected routes
      // For example: when making a GET request you have have a header that has key= x-auth-token value=<jswt>
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
