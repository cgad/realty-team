// dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load User model
const User = require("../../models/User");

// @ROUTE /api/users/test
// @DESCRIPTION test
// @ACCESS public
router.get("/test", (req, res) => {
  res.json({ msg: "success" });
});

// @ROUTE /api/users/register
// @DESCRIPTION register user
// @ACCESS public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.json("Error: " + err));
        });
      });
    }
  });
});

// @ROUTE /api/users/login
// @DESCRIPTION login user, return JWT token
// @ACCESS public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // check if user exists
  // if user exists, use bcryptjs to compare submitted password with hashed password in db
  // if passwords match, create JWT Payload
  // sign jwt, incuding payload, keys.secretOrKey from keys.js, set expiresIn time (secs)
  // if successful, append token to Bearer string (in passport.js, opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();)
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      // check password
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          // create JWT payload
          const payload = {
            id: user.id,
            name: user.name
          };

          // sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 86400 // 1 day
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    })
    .catch(err => res.json("Error: " + err));
});

module.exports = router;
