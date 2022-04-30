const express = require('express');
const mongoose = require('mongoose');
// const app = express();
const Sauce = require('./models/modelsSauce') //gerek yok zannediyorum car on utilise userRoutes
const Users = require('./models/users')//gerek yok zannediyorum

// const piquanteCtrl = require('./routes/piquante')

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

app.use('/api/auth',userRoutes)
app.use('/api/auth',userRoutes)



  module.exports = app;


// app.use((req, res) => {
// //   console.log(req.body)
// //   // console.log("req.body")
// //  res.json({ message: 'Votre requête a bien été reçue !' }); 
// });


  // app.use('/aga/:agaId', (req, res) => {
//   console.log(req.params);  
//   res.json({msg: 'parametre'}) 
// }); 
// app.use('/api/auth',userRoutes)  je recois un msg d'error 401 unautorized 


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


