const express = require("express");
const router = express.Router();

// Controllers
const {register} = require("../controllers/UserController")

//Middlewares
const validate = require("../middlewares/handleValidation")
const { userCreateValidation } = require("../middlewares/userValidations")

// routes
router.post("/register", userCreateValidation(), validate, register)

module.exports = router;