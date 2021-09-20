const express = require("express");
const { getBanks } = require("../controllers/bankscontrol");

const router = express.Router();

// router.route("/reviews/:id").post().delete();
// router.route("/bank/:id").post(postReview).delete(delReview);
router.route("/banks").get(getBanks);

module.exports = router;
