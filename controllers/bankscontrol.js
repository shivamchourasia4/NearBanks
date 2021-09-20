const Banks = require("../models/banks");
const branchs = require("../models/branchs");

//@desc Get Banks list
//@route get /banks
//@access public

exports.getBanks = async (req, res, next) => {
  try {
    const Bank = await Banks.find();

    return res.status(200).json({
      success: "true",
      count: Bank.length,
      data: Bank,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
