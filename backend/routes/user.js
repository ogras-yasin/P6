const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const User = require('../models/users')

// router.post('/signup', userCtrl.signup);

// je ne comprend pas pourquoi on met une route ici 
router.post('/',(req, res, next) => {
    console.log('try to signup');
    delete req.body._id;
    const users = new User({
      ...req.body
    })
    users.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  })




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