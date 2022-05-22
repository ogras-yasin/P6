const Joi = require ('joi')


// au debut j'essaye que avec email 
// apres je  verais avec password

// on veut un min 10 caractere pour email 
const authSchema = Joi.object({
    email:Joi.string().min(10).max(24).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

exports.email = (req,res,next) => { 
    console.log("je suis dans le middleware joi")
    authSchema;
    console.log(req.body)
    console.log("execution de authSchema")
    // next()
}