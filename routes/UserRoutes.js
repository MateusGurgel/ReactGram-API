const express = require("express");
const router = express.Router();

// Controllers
const {register, login, getCurrentUser} = require("../controllers/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation")
const authGuard = require("../middlewares/authGuard");
const { userCreateValidation, loginValidation } = require("../middlewares/userValidations")

// routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)

module.exports = router;