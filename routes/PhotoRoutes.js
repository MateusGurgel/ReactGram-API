const express = require("express");
const router = express.Router();

// Controllers

//Middlewares
const { photoInsertValidation } = require("../middlewares/photoValidation")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidator")
// routes


module.exports = router;