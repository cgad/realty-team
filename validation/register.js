// dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  // instantiate errors object
  let errors = {};

  // convert empty fields to empty strings - validator only works with strings
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  // validations
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }
  // ** TODO: FRONT END ** phone - when user inputs, remove all special characters before sending to backend
  if (
    !Validator.isEmpty(data.phone) &&
    !Validator.isLength(data.phone, { min: 10, max: 10 })
  ) {
    errors.phone = "Phone number is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
