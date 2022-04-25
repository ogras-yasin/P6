const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Sauce = require('./models/modelsSauce')
const Users = require('./models/users')
const userRoutes = require('./routes/user');
// const piquanteCtrl = require('./routes/piquante')
app.use(express.json()); //cela permet d'intercepter toute les requete en format json
//on a acees au req donc je peux acceder au req.body grace a app.use(express.json())
//  la methode ancienne est body.parser

/*connection server  mongo DB atlas*/
mongoose.connect('mongodb+srv://gs_yasin:azerty17@cluster0.fgdhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  


/*CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.post('/api/auth/signup',userRoutes)


app.use((req, res, next) => {
  console.log(req.body); // a chaque fois que je realise ou quelqun realise une requete je vais
  // // recevoir un req.body ds la consoles
  res.status(201).json({
    message: 'Objet créé !'
  });
});

  module.exports = app;


  // app.post('/api/auth/signup',(req, res, next) => {
  //   console.log('try to signup');
  //   delete req.body._id;
  //   const users = new Users({
  //     ...req.body
  //   })
  //   users.save()
  //   .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  //   .catch(error => res.status(400).json({ error }));
  // })




  
// app.post('api/auth/login',(req, res, next) => {
//   console.log('try to login');
//   Users.findOne({_id: req.params.id})
//   .then(thing => res.status(200).json(thing))
//   .catch(error => res.status(404).json({error }))
// })

// app.use('/api/stuff', stuffRoutes);
// app.use('/api/auth', userRoutes);


