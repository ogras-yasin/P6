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
      // si aucun utilisateur ne correspond a la req envoye par le client(req.body.email) 
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
       // Utilisateur trouvé
      // Comparaison du mot de passe envoyé par l'utilisateur qui essai de se connecter avec le hash qui est enregistré dans la base de données
      // bcrypt.compare(mot de passe envoyé PART la requête, hash enregistré dans le document user)
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          console.log("login");
          // si le mot de passe est errone
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          // une fois l'email trouve puis verifier le mot de passe le serveur repond l'userId et le token 
          console.log(user._id)
          res.status(200).json({
             // la cle userId :(correspond a) user TROUVE dans la base de donne,
            //  In computing and telecommunications, the PAYLOAD is the part of transmitted data that is the actual intended message. Headers and metadata are sent only to enable payload delivery
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
