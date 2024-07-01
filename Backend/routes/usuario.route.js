const express = require("express");
const router = express.Router();
const usuarioCtrl = require("../controllers/usuario.controller");

//Defino rutas
router.post("/", usuarioCtrl.createUsuario);
router.post("/login", usuarioCtrl.loginUsuario);

module.exports = router;
