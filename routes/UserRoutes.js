const express = require("express");
const router = express.Router();

// Controllers
const {register, login, getCurrentUser,  } = require("../controllers/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation")
const authGuard = require("../middlewares/authGuard");
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations");
const { imageUpload } = require("../middlewares/imageUpload");

// routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)
router.put("/update", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"))

module.exports = router;