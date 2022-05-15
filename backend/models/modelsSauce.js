const mongoose = require("mongoose");

// est il obliger de mettre une maj a schema
const modelsSauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: {},
  // imageUrl: {type: File, required: true}, // error : file is not defined
  heat: {}, 
  likes: {type: Number, default:0},
  dislikes: {type: Number, default:0},
    // pourquoi [String] avec des crochets ?? 
    // default property ?? 
    // usersLiked: [ "String <userId>" ] — tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce
  usersLiked: {type: [String], default:[]},
  usersDisliked: {type: [String], default:[]},
});

module.exports = mongoose.model("Sauce", modelsSauceSchema);
