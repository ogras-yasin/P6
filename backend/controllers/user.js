const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // console.log(user);//verifier si je RENVOIE une res
      user
        .save()
        // type de message attendue { message: string } accomplie
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) =>
          res.status(400).json({ error: "Ce nom Utilisateur est déjà utilisé" })
        );
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "ceci est une erreur de serveur" });
    });
};

// CONNEXION : Middleware pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
   // Chercher l'utilisateur dans la base de données
  User.findOne({ email: req.body.email })
    .then((user) => {
      // si utilisateur errone
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
       // Utilisateur trouvé
      // Comparaison du mot de passe envoyé par l'utilisateur qui essai de se connecter avec le hash qui est enregistré dans la base de données
      // bcrypt.compare(mot de passe envoyé dans la requête, hash enregistré dans le document user)
      bcrypt
      
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si le mot de passe est errone
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          console.log("login");
          // si tout est bon
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// bcrypt
// .hash(req.body.password, 10)
// .then(function(hash){
//   const user = new User({
//           email: req.body.email,
//           password: hash,
//         });
//   user.save().then(res.status(201).json({ message: 'Utilisateur créé !' }))
//   .catch(res.status(404).json({ error }));
// }).catch(function(error){
//   res.status(500).json({error: error})
// });

// exports.login = (req, res, next) => {
//   User.findOne({ email: req.body.email })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//       }
//       bcrypt.compare(req.body.password, user.password)
//         .then(valid => {
//           if (!valid) {
//             return res.status(401).json({ error: 'Mot de passe incorrect !' });
//           }
//           res.status(200).json({
//             userId: user._id,
//             token: 'TOKEN je suis un exemple'
//           });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };

// code du cours

// const User = require('../models/users')

// exports.signup = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//       const user = new User({
//         email: req.body.email,
//         password: hash
//       });
//       user.save()
//         .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//         .catch(error => res.status(400).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };

// exports.signup = (req, res, next) => { bu benimki
//     console.log('try to signup');
//     delete req.body._id;
//     const users = new User({
//       ...req.body
//     })
//     users.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//     .catch(error => res.status(400).json({ error }));
//   }

// alinti

// const User = require("../models/user");
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const cryptojs = require('crypto-js');
// require('dotenv').config();

// exports.signup = (req, res, next) => {
//   const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_TOKEN).toString(cryptojs.enc.Base64);
//   bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//       const user = new User({
//         email: hashedEmail,
//         password: hash
//       });
//       user.save()
//         .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//         .catch(error => res.status(400).json({ error }));
//     })
//     .catch(error => {
//       console.log(error)
//       return res.status(500).json({ error }) });
// };

// exports.login = (req, res, next) => {
//   const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_TOKEN).toString(cryptojs.enc.Base64);
//   User.findOne({ email: hashedEmail })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//       }
//       bcrypt.compare(req.body.password, user.password)
//         .then(valid => {
//           if (!valid) {
//             return res.status(401).json({ error: 'Mot de passe incorrect !' });
//           }
//           res.status(200).json({
//             userId: user._id,
//             token: jwt.sign(
//               { userId: user._id },
//               process.env.SECRET_TOKEN,
//               { expiresIn: '24h' }
//             )
//           });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };
