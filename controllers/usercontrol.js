const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @dsc  Register New User
// @route  POST /register
// @access rignt now public

exports.Register = async (req, res, next) => {
  const { firstname, lastname, email, address, password } = req.body;
  try {
    //Simple Validation
    if (!firstname || !lastname || !address || !email || !password) {
      return res.status(400).json({ msg: "Please Enter All Fields." });
    } else {
      //Check for existing user
      User.findOne({ email: email }).then((user) => {
        if (user) {
          return res
            .status(400)
            .send({ msg: "User With That Email Already Exists." });
        } else {
          const newUser = new User({
            firstname,
            lastname,
            address,
            email,
            password,
          });

          //Create Salt & hash
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then((user) => {
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
                        lastname: user.lastname,
                        email: user.email,
                      },
                    });
                  }
                );
              });
            });
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
