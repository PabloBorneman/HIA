const jwt = require('jsonwebtoken');
const Usuario = require('./../models/usuario');
const usuarioCtrl = {};

// Crear usuario
usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Usuario guardado.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        });
    }
};

// Iniciar sesión
usuarioCtrl.loginUsuario = async (req, res) => {
  const criteria = {
      username: req.body.username,
      password: req.body.password
  };
  try {
      const user = await Usuario.findOne(criteria).populate('perfil');
      if (!user) {
          res.json({
              status: 0,
              msg: "not found"
          });
      } else {
          // Generar el token
          const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

          res.json({
              status: 1,
              msg: "success",
              username: user.username,
              perfil: user.perfil,
              userid: user._id,
              token: token // Enviar el token en la respuesta
          });
      }
  } catch (error) {
      res.json({
          status: 0,
          msg: 'error'
      });
  }
};

// Modificar usuario
usuarioCtrl.modificarUsuario = async (req, res) => {
    try {
        await Usuario.updateOne({ _id: req.body._id }, req.body);
        res.json({
            status: '1',
            msg: 'Usuario actualizado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion - Actualizar Usuario'
        });
    }
};

// Eliminar usuario
usuarioCtrl.eliminarUsuario = async (req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion - Eliminar Usuario'
        });
    }
};

// Obtener un usuario
usuarioCtrl.obtenerUsuario = async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id).populate('perfil').populate('cursos');
        res.json(user);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion - Obtener Usuario'
        });
    }
};

// Obtener todos los usuarios
usuarioCtrl.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().populate('perfil');
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion - Obtener Usuarios'
        });
    }
};

// Obtener los cursos en los que un usuario está inscrito
usuarioCtrl.obtenerCursosDeUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).populate('cursos');
        if (!usuario) {
            return res.status(404).json({
                status: '0',
                msg: 'Usuario no encontrado'
            });
        }
        res.json({
            status: '1',
            msg: 'Cursos del usuario obtenidos exitosamente',
            cursos: usuario.cursos
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación'
        });
    }
};

// Obtener los cursos impartidos por un usuario
usuarioCtrl.obtenerCursosImpartidosPorUsuario = async (req, res) => {
  try {
      const usuario = await Usuario.findById(req.params.id).populate('cursosImpartidos');
      if (!usuario) {
          return res.status(404).json({
              status: '0',
              msg: 'Usuario no encontrado'
          });
      }
      res.json({
          status: '1',
          msg: 'Cursos impartidos por el usuario obtenidos exitosamente',
          cursosImpartidos: usuario.cursosImpartidos
      });
  } catch (error) {
      res.status(400).json({
          status: '0',
          msg: 'Error procesando la operación'
      });
  }
};


module.exports = usuarioCtrl;
