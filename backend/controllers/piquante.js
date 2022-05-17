// const express = require("express");
const Sauce = require("../models/modelsSauce");
const fs = require("fs"); // Importation du package file system 'fs'

// AJOUTER UNE NOUVELLE SAUCE : Middleware pour ajouter une sauce
exports.createSauce = (req, res, next) => {
  console.log(req.body); // pour voir si on recoit une reponse NON je ne recois rien du tout
  // ONEMLI // Transforme la chaîne de caractère en objet
  const sauceObject = JSON.parse(req.body.sauce);
  // suprimer l'id creer d'office
  delete sauceObject._id;
  // nouvelle Sauce  a partir du model modelsSauce
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    // sauvegarde ds mongoDB
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
      console.log("not save in mongo db");
    });
};

// VOIR UNE SAUCE : Middleware pour voir une sauce
// rien ne s'affiche lorsque je clique trouver et resoudre le probleme
exports.findSingleSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
      // console.log("tu as reussi a choisir une sauce par son id");
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// MODIFIER une sauce
exports.modifySauce = (req, res, next) => {
  console.log("---> inside put then you do a req the res is :");
  const sauceObject = req.file
    ? // si req.file existe (le client a ajouter une image) alors on recupere la chaine de caractere(req.body.sauce) et on la parse en object JSON.parse et on modifie l'image URL.
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : // sinon on prend le corps de la requete
      { ...req.body };
  // ici ce que l'on fait on selection l'object a modifier grace a son id et on modifie ...
  console.log("--->req.body _______________");
  console.log(req.body);
  // CHARGER les modifications dans la bd
  Sauce.updateOne(
    { _id: req.params.id },
    // On prend cette object que l'on a créer {...sauceObject} et on modifie son identifiant pour correspondre à la req
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// SUPRIMER une sauce //reacrive ceux qui sont griser
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      console.log("--->sauce Sauce.findOne({ _id: req.params.id }) :");
      console.log(sauce); // sauce represente le document retourner par findOne correspondant a l'argurment id
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// RECUPERER tout les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((allSauce) => {
      res.status(200).json(allSauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
