const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("The name must be at least 3 characters long"),
    body("email")
      .isString()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("The email must be valid"),
  ];
};

module.exports = { userCreateValidation };
