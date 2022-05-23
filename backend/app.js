const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const piquanteRoutes = require("./routes/piquante");
const path = require("path");
const helmet = require("helmet")
require('dotenv').config()

mongoose
  .connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Permet de parser et de mettre dans le body toutes les requetes

app.use(helmet());
app.use(express.json());
// /image avant ou apres
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", piquanteRoutes);

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;

/*
  The app.use() function adds a new middleware to the app. Essentially, whenever a request hits your backend, 
  Express will execute the functions you passed to app.use() in order. 
  express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
   */

// c'est quoi la route du sauce
// premier objectif est de creer la route post

////////
