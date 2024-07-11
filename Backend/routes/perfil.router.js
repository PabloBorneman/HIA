const perfilCTRL = require("./../controllers/perfil.controller");
const express = require("express");
const router = express.Router();

router.get("/", perfilCTRL.obtenerPerfils);
router.get("/:id", perfilCTRL.obtenerUnPerfil);
router.post("/", perfilCTRL.crearPerfil);

module.exports = router;