const express = require('express');
const mongoose = require('mongoose');
// const app = express();
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://gs_yasin:azerty17@cluster0.fgdhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  /*
  The app.use() function adds a new middleware to the app. Essentially, whenever a request hits your backend, 
  Express will execute the functions you passed to app.use() in order. 
  express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
   */
  // Permet de parser et de mettre dans le body toutes les requetes 
app.use(express.json())
  
// app.use('/api',userRoutes)
app.use('/api/auth',userRoutes) //routes + auth


app.use((req, res) => {
  console.log(req.body)
 res.json({ message: 'Votre requête a bien été reçue !' }); 
});


  module.exports = app;


  // const Sauce = require('./models/modelsSauce') //gerek yok zannediyorum car on utilise userRoutes
  // const Users = require('./models/users')//gerek yok zannediyorum
  
  // const piquanteCtrl = require('./routes/piquante')
  