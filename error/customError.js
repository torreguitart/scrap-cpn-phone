require("./errorHandler");
class MainError extends Error {
  constructor(errorMessage, errorType = "") {
    super();

    this.name = this.constructor.name;
    this.message = errorMessage;

    switch (this.constructor.name) {
      case "CompanyError":
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 400;
        }
        break;
      case "RequestError":
        this.statusCode = 400;
        break;
      default:
        console.log("No handler for that");
    }
  }
}
class CompanyError extends MainError {}
class RequestError extends MainError {}

module.exports = {
  MainError,
  RequestError,
  CompanyError
};
