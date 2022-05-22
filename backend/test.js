const Joi = require ('joi')

const authSchema = Joi.object({
    email:Joi.string().min(10).max(24).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

exports.email = (req,res,next) => { 
    console.log("je suis dans le middleware joi")
    req.body.authSchema;
    console.log(req.body)
    console.log( req.body.authSchema)
    console.log("execution de authSchema")
    next()
}

console.log("hi bro")