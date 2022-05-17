const jwt = require("jsonwebtoken");

// Récupération du TOKEN qu'il y a dans la REQUEST envoyé par le FRONT
module.exports = (req, res, next) => {
  try {
    //split on extrait le token de Bearer.  
    // récuperer le token dans le [headers] [authorization]: bearer token
    // separer le bearer du token avec .split(" ")[1]
    const token = req.headers.authorization.split(" ")[1];
    // decoder le token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // recuperer le userdId qu'il y a a l'interieur du token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
    console.log("error in try/catch see in middleware auth");
  }
};
