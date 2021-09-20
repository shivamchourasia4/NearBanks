const Branchs = require("../models/branchs");

//@desc Get by ifsc
//@route get ifsc/search
//@access public
exports.getBranchsByifsc = async (req, res, next) => {
  try {
    if (!req.query.ifsc) {
      return res.status(400).json({
        success: false,
        error: "bad request",
        msg: "needs query param of ifsc",
      });
    }
    var ifsc = req.query.ifsc.toUpperCase();
    const branchs = await Branchs.find({
      ifsc: ifsc,
    });

    // if (branchs) {
    //   return res.status(200).json({
    //     success: false,
    //     error: "nothing associated with that ifsc",
    //   });
    // }

    return res.status(200).json({
      success: true,
      count: branchs.length,
      data: branchs,
    });
  } catch (err) {
    return res.sendStatus(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc Get Branches by city and bank name
//@route get city/search
//@access public
exports.getBranchsBycity = async (req, res, next) => {
  try {
    if (!req.query.bank_name || !req.query.city) {
      return res.status(400).json({
        success: false,
        data: "bad request",
        msg:
          "needs query params of at least bank_name and city, district is optional",
      });
    }

    var city_name = req.query.city.toUpperCase();
    var bank_name = req.query.bank_name.toUpperCase();
    if (req.query.district) {
      var district_name = req.query.district.toUpperCase();

      try {
        const branchs = await Branchs.find({
          bank_name: bank_name,
          city: city_name,
          district: district_name,
          //   ifsc: ifsc,
        });

        return res.status(200).json({
          success: true,
          count: branchs.length,
          data: branchs,
        });
      } catch (err) {
        return res.sendStatus(500).json({
          success: false,
          error: "Server Error",
        });
      }
    }

    const branchs = await Branchs.find({
      bank_name: bank_name,
      city: city_name,
    });

    return res.status(200).json({
      success: true,
      count: branchs.length,
      data: branchs,
    });
  } catch (err) {
    return res.sendStatus(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
