const Joi = require("joi");

const authSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).max(24).required(),
});

exports.email = (req, res, next) => {
  if (authSchema.validate(req.body)) {
//   if (authSchema.validate.error) {

    console.log("je suis dans le middleware joi");
    console.log("-------> authSchema");
    // ce quon obtient dans le console log pour if
    // console.log(authSchema.validate(req.body))

        try {
// si authSchema est false
            if (!authSchema.validate(req.body).error){
                console.log("je suis dans le try if -- pas d'erreur")
            } else{
                console.log( "authSchema est false -- il y a une erreur ")
            }
            
            // si try est fausse alors catch
            // si tu ne trouve pas d'erreur vas dans le catch -- ma logique
            !authSchema.validate(req.body).error
            // IL y A UNE ERREUR MAIS IL NE PASSE PAS A CATCH POURQUOI ?
        } catch (error) {
            console.log("--->catch")
            res.status(422).json({
                message: error.details[0].message,
                error: validation.error,})
        }
    // next()
  } else {
    res.status(422).json({
      message: error.details[0].message,
      error: validation.error,
    });
  }
};

// const { error } = await validateInput(user); // request body user.
// if (error) {
//   return res.status(400).send({ message: error.details[0].message });
// // it will return for you the message.
// }

// .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
