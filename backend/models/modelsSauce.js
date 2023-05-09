const mongoose = require("mongoose");

// est il obliger de mettre une maj a schema / OUI
const modelsSauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: {},
  // imageUrl: {type: File, required: true}, // error : file is not defined
  heat: {},

  // système de like disliked
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

module.exports = mongoose.model("Sauce", modelsSauceSchema);
