const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const User = require('../models/users')
  const auth = require('../middleware/auth');

// je ne comprend pas pourquoi on met une route ici '/' un middleware ds un middleware
router.post('/signup', auth, userCtrl.signup)

router.post('/login', auth,  userCtrl.login);
 


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