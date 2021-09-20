const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @dsc  Auth User
// @route  POST /auth
// @access rignt now public

exports.Auth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Simple Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please Enter All Fields." });
    }

    //Check for existing user
    User.findOne({ email: email }).then((user) => {
      if (!user) return res.status(400).json({ msg: "User Does Not Exists." });

      // Validate Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials." });

        jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                firstname: user.firstname,
                latname: user.lastname,
                email: user.email,
              },
            });
          }
        );
      });
    });
  } catch (err) {
    return res.sendStatus(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @dsc  Get User data
// @route  GET /auth/changepassword
// @access Private

exports.changePassword = (req, res, next) => {
  const { email, password, newPassword } = req.body;
  try {
    if (!password)
      return res.status(400).json({ msg: "Please Enter All Fields." });

    User.findOne({ email: email }).then((user) => {
      if (!user) return res.status(400).json({ msg: "User Does Not Exists." });

      // Validate Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Incorrect Current Password!" });

        //Generating Salt
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newPassword, salt, function (err, hash) {
            if (err) throw err;

            User.updateOne({ email: email }, { $set: { password: hash } })
              .then(() => {
                return res.status(201).json({
                  success: true,
                  msg: "Password Changed Successfully",
                });
              })
              .catch(() => {
                return res.sendStatus(500).json({
                  success: false,
                  error: "Server Error",
                });
              });
          });
        });
      });
    });
  } catch (err) {
    return res.sendStatus(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @dsc  Get User data
// @route  GET /auth/user
// @access Private

exports.getUserdata = (req, res, next) => {
  User.findOne({ email: req.params.email })
    .select("-password")
    .then((user) => {
      res.json(user);
    });
};
// @dsc  Get Users data for Suggestion
// @route  GET /auth/users
// @access Private

exports.getUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then((user) => res.json(user));
};
