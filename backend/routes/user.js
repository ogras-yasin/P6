const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
// const check_email =require("../middleware/check-email");
const joi = require("../middleware/joi")
// const check_email = require("../middleware/check-email")

// carte vers les controleurs
//separation routes de controllers
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;


// ************test Joi**************
// const Joi = require ('joi')
