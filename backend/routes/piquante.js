const express = require("express");
const router = express.Router();
const piquanteCtrl = require("../controllers/piquante");
const likeCtrl = require("../controllers/like");
// importation du middleware multer pour la gestion des fichiers images
const multer = require("../middleware/multer-config");

const auth = require("../middleware/auth");

router.post("/", auth, multer, piquanteCtrl.createSauce);

router.get("/:id", auth, piquanteCtrl.findSingleSauce);

router.put("/:id", auth, multer, piquanteCtrl.modifySauce);

router.delete("/:id", auth, piquanteCtrl.deleteSauce);

router.get("/" + "", auth, piquanteCtrl.getAllSauce);

// likes a créé
router.post("/:id/like", auth, likeCtrl.createLike);

module.exports = router;

// ?! ce signe veut dire c'est bon ou pas
// model sauce // sauce en miniscule ?!
