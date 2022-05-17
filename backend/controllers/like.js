// Importation du model de le base de donnes
const Sauce = require("../models/modelsSauce");

exports.createLike = (req, res, next) => {
  console.log("Je suis dans le controleur like !");
  // res.status(200).res.Json({ msg: "like recu" });
  // console.log("---> req");
  // console.log(req);

  // mise au format de l'id pour pouvoir aller chercher l'objet correspondant dans mongoDB
  console.log("---> req.params");
  console.log(req.params.id);
  // console.log("---> req.body");
  // console.log(req.body);
  console.log({ _id: req.params.id });
  // canim property
  // console.log({canim : req.params.id})

  // aller chercher l'object dans la base de l'objet
  Sauce.findOne({ _id: req.params.id }).then((object) => {
    console.log(object);

    // utilisation de la methode javascript includes()
    // si le usersLiked est false FALSE ET si like ===1
    if (object.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
      console.log("instructions execute");
    } else console.log("error");
    res
      .status(200).json({object})
      .catch((error) => res.status(404).json({ msg: error }));
  });
};
