// Importation du model de le base de donnes
const Sauce = require("../models/modelsSauce");
      // utilisation de l'operateur $inc (mongoDB)
      // utilisation de l'operateur $push (mongoDB)
      // utilisation de l'operateur $pull (mongoDB)
      // utilisation de la methode javascript includes()

exports.createLike = (req, res, next) => {
  // aller chercher l'object dans la base de l'objet
  Sauce.findOne({ _id: req.params.id })
    .then((object) => {

      //AJOUTER TOUTES LES CONDITIONS DE LOGIQUE dans les [if]
      // si le usersLiked est false FALSE ET si like ===1 [ajout de like]  
      if (!object.usersLiked.includes(req.body.userId) && req.body.like === 1) {
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

      //   si le usersLiked est TRUE et si like === -1 [diminuer le like a 0]
      else if (
        object.usersLiked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
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
      //   si le usersDisliked est TRUE et si dislike === 1 [diminuer le dislike a 0]
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
      //   si le usersDisliked est FALSE et si dislike === -1 [augmenter le dislike a 1]
      else if (
        !object.usersDisliked.includes(req.body.userId) && req.body.dislike === -1
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          //   inc le dislikes et ajouter le userId dans le tableau usersDisliked
          { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
        )
          .then(() =>
            res.status(201).json({ message: "dislike 1 / userid push" })
          )
          .catch((error) => res.status(404).json({ error }));
      }

      
      else {
        console.log("---> instruction non execute");
        res.status(201).json({
          msg: "aucune instruction ne convient dans la logique likes usersLiked"
        });
      }
    })
    .catch((error) => res.status(404).json({ msg: error }));
};
