// const express = require("express");
const Sauce = require("../models/modelsSauce");
const fs = require("fs"); // Importation du package file system 'fs'

// AJOUTER UNE NOUVELLE SAUCE : Middleware pour ajouter une sauce
exports.createSauce = (req, res, next) => {
  console.log(req)
  // suprimer l'id creer d'office 
  delete req.body._id;
  // nouvelle Sauce  a partir du model modelsSauce
  const sauce = new Sauce({
    // // users Id : ce que l'on passe dans body userId  [clé:valeur]
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    // imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
    imageUrl: `${request.protocol}://${request.get("host")}/images/${
      request.file.filename
    }`,
    // ...req.body //raccourci operateur etablit une copie de tous les elements de req.body
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

exports.findSingleSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  const sauce = new Sauce({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
  });
  Thing.updateOne({ _id: req.params.id }, thing)
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
  Sauce.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// exports.like;
