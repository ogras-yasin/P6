const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
// const check_email =require("../middleware/check-email");
// const authSchema = require("../middleware/joi")
// const check_email = require("../middleware/check-email")

// route de user
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;


// ************test Joi**************
// const Joi = require ('joi')
