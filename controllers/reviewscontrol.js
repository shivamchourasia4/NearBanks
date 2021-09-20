const Branchs = require("../models/branchs");

//@desc Get Reviews of particular branch
//@route get /reviews
//@access public

exports.getReviews = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        error: "bad request",
        msg: "needs query param of id",
      });
    }

    var id = req.params.id;
    try {
      const Branch = await Branchs.findById(id);

      const reviews = Branch;

      return res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        data: "bad request",
        msg: "not a valid _id",
      });
    }
  } catch (err) {
    return res.sendStatus(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc Post Reviews
//@route post /reviews/:id
//@access To be made private

exports.postReview = async (req, res, next) => {
  try {
    let dt = Date();
    const time = dt.toString();
    const incomming = req.body.body;
    var tbp = {
      review: incomming.Review,
      firstname: incomming.firstname,
      lastname: incomming.lastname,
      support: incomming.support,
      atm: incomming.atm,
      Resp: incomming.Resp,
      services: incomming.services,
      Interest: incomming.Interest,
      Fee: incomming.Fee,
      timestamp: time,
    };

    try {
      const review = await Branchs.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { reviews: tbp },
        }
      );
      return res.status(201).json({
        success: true,
        data: review,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        data: "bad request",
        msg: "not a valid _id",
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

exports.delReview = async (req, res, next) => {
  try {
    try {
      const del = await Branchs.updateOne(
        { _id: req.params.id },
        { $pull: { reviews: { rating: req.body.rating } } }
      );
      return res.status(200).json({
        success: true,
        data: del,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        data: "bad request",
        msg: "not a valid _id",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
