module.exports = (req, res, next) => {
  const validEmail = (email) => {
    let emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let isRegexTrue = emailRegexp.test(email);
    console.log("email en cours valid")
    console.log(email)

    isRegexTrue ? next( console.log("suivant")) : console.log("email non valid");res.status(400).json({ message: "mail non valide" });
  };
  validEmail(req.body.email);
};
