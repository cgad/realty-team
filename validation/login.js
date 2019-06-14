// dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

// function to validate from frontend form, export
module.exports = function validateLoginInput(data) {
  // instantiate errors object
  let errors = {};

  // convert empty fields to strings - validator only works with strings
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // check for empty fields and validate email format
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  // return errors object and isValid boolean which checks for errors - if errors object is empty, all form inputs are valid
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
