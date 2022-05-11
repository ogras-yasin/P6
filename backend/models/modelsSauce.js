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
  likes: {type: Number, defaut:0},
  dislikes: {type: Number, defaut:0},
  usersLiked: {type: String},
  usersDisliked: {type: String},
});

module.exports = mongoose.model("Sauce", modelsSauceSchema);
