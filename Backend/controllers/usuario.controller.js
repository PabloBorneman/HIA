const Usuario = require("../models/usuario");
const usuarioCtrl = {};

//Crear Usuario
usuarioCtrl.createUsuario = async (req, res) => {
  //En req.body se espera que vengan los datos del usuario a crear
  const usuario = new Usuario(req.body);
  try {
    await usuario.save();
    res.status(200).json({
      status: "1",
      msg: "Usuario creado.",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando operación.",
    });
  }
};

//Login Usuario
usuarioCtrl.loginUsuario = async (req, res) => {
  //En req.body se espera que vengan las credenciales del login
  //Defino criterios de búsqueda basándome en el username y password recibidos
  const criterio = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    //'findOne' devuelve un objeto que cumpla con los criterios de búsqueda
    const user = await Usuario.findOne(criterio);
    if (!user) {
      res.json({
        status: 0,
        msg: "Usuario no encontrado",
      });
    } else {
      res.json({
        status: 1,
        msg: "Login exitoso",
        username: user.username,
        perfil: user.perfil,
        userId: user._id,
      });
    }
  } catch (error) {
    res.json({
      status: 0,
      msg: "Error en la autenticación",
    });
  }
};

module.exports = usuarioCtrl;
