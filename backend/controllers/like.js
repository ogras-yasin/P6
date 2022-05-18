// Importation du model de le base de donnes
const Sauce = require("../models/modelsSauce");

exports.createLike = (req, res, next) => {
  console.log("Je suis dans le controleur like !");

  console.log("---> req.params");
  console.log(req.params);
  console.log("---> req.body");
  console.log(req.body);
  console.log("------------> _id: req.params.id ");
  console.log({ _id: req.params.id });
  // canim property
  // console.log({canim : req.params.id})

  // aller chercher l'object dans la base de l'objet
  Sauce.findOne({ _id: req.params.id })
    .then((object) => {
      console.log("------------> sauce");

      // utilisation de l'operateur $inc (mongoDB)
      // utilisation de l'operateur $push (mongoDB)
      // utilisation de l'operateur $pull (mongoDB)
      console.log("--------->object.usersLiked");
      console.log(object.usersLiked);
      // utilisation de la methode javascript includes()
      // si le usersLiked est false FALSE ET si like ===1 [ajout de like]
      // dans ta requete ne met pas de guillement a 1 ["like" : 1]
      if (!object.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        console.log("instructions execute");
        console.log(req.body);

        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { likes: 1 } },
          // LIKES WORK BUT PUSH dosnt work
          // je n'arrive pas a pusher userdId dans le tableau
          { $push: { usersliked: req.body.userId } }
        )
          .then(() =>
            res.status(201).json({ message: "like +1 / userid push", object })
          )
          .catch((error) => res.status(404).json({ error }));

        // res.status(201).json("ajoute un like avec succes");
      } else {
        console.log("___> instruction non execute");
        res.status(201).json({ object });
      }
    })
    .catch((error) => res.status(404).json({ msgaa: error }));
};
