// const express = require("express");
const Sauce = require("../models/modelsSauce");
const fs = require("fs"); // Importation du package file system 'fs'

// AJOUTER UNE NOUVELLE SAUCE : Middleware pour ajouter une sauce
exports.createSauce = (req, res, next) => {
  console.log(req.body ) // pour voir si on recoit une reponse NON je ne recois rien du tout
  // ONEMLI // Transforme la chaîne de caractère en objet
  const sauceObject = JSON.parse(req.body.sauce)
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
      console.log('tu as reussi a choisir une sauce par son id')
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};



// error a modify 
// peut etre a modifier 
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
...JSON.parse(req.body.sauce),
imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  } : {...req.body.sauce}
console.log(req.body.sauce)
  // not sure if its right
  // Sauce.updateOne({ _id: req.params.id }, sauce)
  // On prend ce identifiant et on modifie 
  // pour qui correspond aux parametres de la req
  Sauce.updateOne({ ...req.body, id }, sauce)

    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });console.log('sauce not update')
    });
};




exports.deleteSauce = (req, res, next) => {
  // not sure if sauce is not enough
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllSauce = (req, res, next) => {
  // trouver dans sauce ?!
  console.log((req.body) + 'choisir toutes les sauces')
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

// exports.like;
