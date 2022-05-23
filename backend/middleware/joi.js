const Joi = require ('joi')

const authSchema = Joi.object().keys({
    email:Joi.string().email().required(),
    password:Joi.string().min(10).max(24).required()
})


authSchema.validate({email: "req.body.email"})

exports.email = (req,res,next) => { 
    if(authSchema.validate(req.body)){
        console.log("je suis dans le middleware joi")
        console.log("-------> req.body")
        console.log(req.body)
        // authSchema.validate({email: req.body.email, password: req.body.password})
        // authSchema.validate(req.body)
 
        next()
    } else{
        res.status(400).json({ error: "erreur de data validation" });
        console.log("erreur ne convient pas a joi")
    }
    
}




// Pour l'instant je fais des tests  pour voir unn peux comment ca fonctionne joi. 
// J'ai rajouté if else.

// .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))