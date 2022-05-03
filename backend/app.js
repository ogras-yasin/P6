const express = require('express');
// const app = express();
const mongoose = require('mongoose');
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

//  cela permet d'invoquer le fichier 
// ecrire beaucoup de commentaire yasin vraiment ecris partout cela va énormement m'aider.

// on a acces au corps de la requete  
// ce que ca fait il intercepte toute les requetes content/type : json et nous mette a disposition ce corps de la requete sur l'objet de la requete req.body 
// express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
 //je parse et le transmet dans le corps de la requete // cela doit etre place tou au dessus des autres app.use car c'est un body-parser 
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', userRoutes);




  module.exports = app;




/*
// exemple  
app.use(express.json())
app.use((req,res) =>{
console.log(req.body);
res.json({msg : 'la requete a bien ete recu'})

})


var text = 
//Json format
'{"employees":[' +
'{"firstName":"John","lastName":"Doe" },' +
'{"firstName":"Anna","lastName":"Smith" },' +
'{"firstName":"Peter","lastName":"Jones" }]}';

// Parse a Json obj 
obj = JSON.parse(text);
// we take the second element of text table
console.log(
obj.employees[1].firstName + " " +
 obj.employees[2].lastName
 
 )
// </script> 

let formatJson =  '{"cle1":"value", "cle2": "2value"}';
// let formatJson = '{"name":"John", "age":30, "car":null}'
let formatParsed = JSON.parse(formatJson) 

console.log(formatParsed)
*/





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


// const Sauce = require('./models/modelsSauce') //gerek yok zannediyorum car on utilise userRoutes
// const Users = require('./models/users')//gerek yok zannediyorum

// const piquanteCtrl = require('./routes/piquante')



