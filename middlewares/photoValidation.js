const { body } = require("express-validator");

const photoInsertValidation = () => {
    return [
      body("title")
        .not()
        .equals("undefined")
        .withMessage("The title is required")
        .isString()
        .withMessage("The title is required")
        .isLength({ min: 3 })
        .withMessage("The title must have at least 3 characteres."),
      body("image").custom((value, { req }) => {
        if (!req.file) {
          throw new Error("image is required");
        }
        return true;
      }),
    ];
  };

  const photoUpdateValidation = () => {
    return [
      body("image")
        .optional()
        .custom((value, { req }) => {
          if (!req.file) {
            throw new Error("A imagem é obrigatória");
          }
          return true;
        }),
      body("title")
        .optional()
        .isString()
        .withMessage("O título é obrigatório")
        .isLength({ min: 3 })
        .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    ];
  };
  
module.exports = { photoInsertValidation, photoUpdateValidation };
