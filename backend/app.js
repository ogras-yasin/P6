const express = require('express');
const mongoose = require('mongoose');
const app = express();



app.use((req, res) => {
    console.log(req.body)
    console.log("req.body")
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

mongoose.connect('mongodb+srv://gs_yasin:azerty17@cluster0.fgdhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  

module.exports = app;


 


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

