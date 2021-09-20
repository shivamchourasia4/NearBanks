const express = require("express");
const {
  postReview,
  delReview,
  getReviews,
} = require("../controllers/reviewscontrol");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// router.route("/reviews/:id").post().delete();
router
  .route("/reviews/:id")
  .post(authenticate, postReview)
  .delete(authenticate, delReview);
router.route("/reviews/:id").get(getReviews);

module.exports = router;
