const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

// router.post('/signup', auth, userCtrl.signup)
// router.post('/login', auth,  userCtrl.login);

// pas de  auth dans un premmier temps pour signup ou login
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
