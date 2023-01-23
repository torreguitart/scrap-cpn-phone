const { RequestError } = require("../error/customError");
const Company = require("../models/company");

exports.scrapCpn = async (req, res, next) => {
  try {
    const { name, address } = req.body;
    let message = "";
    let status = "";
    // Parameter 'name' required
    if (!name) {
      throw new RequestError("Missing parameter name");
    }
    // Fire function searchPhone and return response
    await Company.searchPhone(name, address).then(data => {
      if (data) {
        let statusCode;
        if (data.length == 0) {
          statusCode = 404;
          status = "Error";
          message = `Nothing found for ${name}`;
        } else if (data.length == 1) {
          statusCode = 200;
          status = "Success";
          message = message = "Phone number found";
        } else {
          statusCode = 400;
          status = "Warning";
          message = `${data.length} results for ${name}, first result returned... Please retry with options`;
        }
        return res
          .status(statusCode)
          .json({ status: status, message: message, phone_number: data[0] });
      } else {
        return res
          .status(404)
          .json({ status: "Error", message: `Nothing found for ${name}` });
      }
    });
  } catch (err) {
    console.log("error in ctrl company", err);
    next(err);
  }
};

exports.module = Company;
