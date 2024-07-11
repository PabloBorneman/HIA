const express = require("express");
const router = express.Router();
const cursoCtrl = require('./../controllers/curso.controller');
const authCtrl = require('./../controllers/auth.controller');

router.get('/', authCtrl.verifyToken, cursoCtrl.obtenerCursos);
router.get('/:id', authCtrl.verifyToken, cursoCtrl.obtenerUnCurso);
router.post('/', authCtrl.verifyToken, cursoCtrl.crearCurso);
router.put('/:id', authCtrl.verifyToken, cursoCtrl.modificarCurso);
router.delete('/:id', authCtrl.verifyToken, cursoCtrl.eliminarCurso);

// Nueva ruta para inscribir usuarios en cursos
router.post('/:id/inscribir', authCtrl.verifyToken, cursoCtrl.inscribirUsuario);

module.exports = router;
