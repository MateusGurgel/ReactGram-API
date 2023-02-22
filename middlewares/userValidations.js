const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("The name must be at least 3 characters long"),
  ];
};

module.exports = { userCreateValidation };
