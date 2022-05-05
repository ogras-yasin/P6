const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //split on extrait le token de Bearer.  Donc le Bearer devra se trouver ds login 
    // mais je ne trouve pas ds login je le trouve seulement ds sauces.
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};