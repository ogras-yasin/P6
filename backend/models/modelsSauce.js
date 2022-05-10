const mongoose = require("mongoose");

// est il obliger de mettre une maj a schema
const modelsSauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: {}, //{ type: String, required: true },
  heat: {}, //{type: String, required: true},
  likes: {}, //{type: Number},
  dislikes: {}, //{type: Number},
  usersLiked: {}, //{type: Number},
  usersDisliked: {}, //{type: Number}
});

module.exports = mongoose.model("Sauce", modelsSauceSchema);
