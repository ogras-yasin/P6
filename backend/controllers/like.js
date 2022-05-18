// Importation du model de le base de donnes
const Sauce = require("../models/modelsSauce");

exports.createLike = (req, res, next) => {
  // aller chercher l'object dans la base de l'objet
  Sauce.findOne({ _id: req.params.id })
    .then((object) => {
      // utilisation de l'operateur $inc (mongoDB)
      // utilisation de l'operateur $push (mongoDB)
      // utilisation de l'operateur $pull (mongoDB)
      // utilisation de la methode javascript includes()

      // si le usersLiked est false FALSE ET si like ===1 [ajout de like]
      // dans ta requete ne met pas de guillement a 1 ["like" : 1]
      //AJOUTER TOUTES LES CONDITIONS DE LOGIQUE dans les [if]
      if (!object.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        // console.log("instructions execute");
        // console.log(req.body);
        // syntax updateOne(filter, update, options)
        Sauce.updateOne(
          { _id: req.params.id }, //filter
          { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } } //update
        )
          .then(() =>
            res.status(201).json({ message: "like +1 / userid push", object })
          )
          .catch((error) => res.status(404).json({ error }));
      }

      //   like = 0 likes= 0, pas de vote
      //   si le usersLiked est TRUE et si like === -1 [diminuer le like a 0]
      else if (
        object.usersLiked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        console.log("--->userId est dans usersLiked ET like = 0");
        Sauce.updateOne(
          { _id: req.params.id },
          //   diminuer le like et enlever l'userId de la BDD
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() =>
            res.status(201).json({ message: "like 0 / userid push", object })
          )
          .catch((error) => res.status(404).json({ error }));
      }
      //   si le usersDisliked est TRUE et si like === +1 [diminuer le dislike a 0]
      else if (
        object.usersDisliked.includes(req.body.userId) &&
        req.body.dislike === 1
      ) {
        console.log("--->userId est dans usersDisliked ET like = 1");
        Sauce.updateOne(
          { _id: req.params.id },
          //   diminuer le dislike et enlever l'userId de la BDD
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          .then(() =>
            res.status(201).json({ message: "dislike 0 / userid pull" })
          )
          .catch((error) => res.status(404).json({ error }));
      }
      //   si le usersDisliked est FALSE et si like === -1 [augmenter le dislike a 1]
      else if (
        !object.usersDisliked.includes(req.body.userId) &&
        req.body.dislike === -1
      ) {
        console.log("--->userId n'est pas dans usersDisliked ET like = -1");
        Sauce.updateOne(
          { _id: req.params.id },
          //   inc le dislikes et ajouter le userId dans le tableau usersDisliked
          { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } }
        )
          .then(() =>
            res.status(201).json({ message: "dislike 1 / userid push" })
          )
          .catch((error) => res.status(404).json({ error }));
      }

      //   Si je met plusieurs if je peux executer le if et le else donc 2 commandes. En effet le else prend en compte seulement le dernier if
      //   Du coup ici le else est tjs executer pour les 3/4 if qui se touve au dessus (sauf le dernier) quoi faire
      else {
        console.log("___> instruction non execute");
        res.status(201).json({
          msg: "aucune instruction ne convient dans la logique likes usersLiked",
          object,
        });
      }
    })
    .catch((error) => res.status(404).json({ msgaa: error }));
};
