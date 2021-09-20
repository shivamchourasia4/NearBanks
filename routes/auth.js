const express = require("express");

const router = express.Router();

//User Model
const { Auth, changePassword } = require("../controllers/authcontrol");
const { getUserdata, getUsers } = require("../controllers/authcontrol");
const { test } = require("../controllers/reviewscontrol");
const authenticate = require("../middleware/authenticate");

router.route("/auth").post(Auth);

router.route("/auth/user/:email").get(authenticate, getUserdata);

router.route("/auth/users").get(authenticate, getUsers);

router.route("/auth/changepassword").post(changePassword);

module.exports = router;
