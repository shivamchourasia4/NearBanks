const express = require("express");
const {
  getBranchsBycity,
  getBranchsByifsc,
} = require("../controllers/searchcontrol");
const router = express.Router();

//search by query params
router.route("/city/search").get(getBranchsBycity);
//search by post
// router.route("/search").post(getBranchsBycity); //no need

router.route("/ifsc/search").get(getBranchsByifsc);

module.exports = router;
