const express = require("express");
const router = express.Router();
const usuarioCtrl = require('./../controllers/usuario.controller');
const authCtrl = require('./../controllers/auth.controller');



router.post('/', usuarioCtrl.createUsuario);
router.post('/login', usuarioCtrl.loginUsuario);





module.exports = router;
