const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// router.post('/signup', auth, userCtrl.signup)
// router.post('/login', auth,  userCtrl.login);

// sans auth dans un premmier temps 
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login);

 


module.exports = router;


 



// alinti 
// const express = require("express");
// const router = express.Router()

// const userCtrl = require("../controllers/user");
// const checkPassword = require("../middleware/check-password")
// const checkEmail = require("../middleware/check-email")

// router.post("/signup", checkEmail, checkPassword, userCtrl.signup);
// router.post("/login", userCtrl.login);

// module.exports = router;