const express = require("express");
const router = express.Router();
const usuarioCtrl = require('./../controllers/usuario.controller');
const authCtrl = require('./../controllers/auth.controller');


router.get('/', authCtrl.verifyToken, usuarioCtrl.obtenerUsuarios);
router.get('/:id', authCtrl.verifyToken, usuarioCtrl.obtenerUsuario);
router.post('/', usuarioCtrl.createUsuario);
router.post('/login', usuarioCtrl.loginUsuario);
router.put('/:id', authCtrl.verifyToken, usuarioCtrl.modificarUsuario);
router.delete('/:id', authCtrl.verifyToken, usuarioCtrl.eliminarUsuario);



// Nueva ruta para obtener los cursos en los que un usuario está inscrito
router.get('/:id/cursos', authCtrl.verifyToken, usuarioCtrl.obtenerCursosDeUsuario);
// Nueva ruta para obtener los cursos impartidos por un usuario
router.get('/:id/cursosImpartidos', authCtrl.verifyToken, usuarioCtrl.obtenerCursosImpartidosPorUsuario);




module.exports = router;
