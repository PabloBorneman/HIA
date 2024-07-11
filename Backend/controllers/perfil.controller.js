const Perfil = require("../models/perfil");
const perfilController = {};

perfilController.obtenerPerfils = async (req, res) => {
  var perfils = await Perfil.find();
  res.json(perfils);
};

perfilController.obtenerUnPerfil = async (req, res) => {
  const perfil = await Perfil.findById(req.params.id);
  res.json(perfil);
};

perfilController.crearPerfil = async (req, res) => {
  var perfil = new Perfil(req.body);
  try {
    await perfil.save();
    res.json({
      status: "1",
      msg: "Perfil nuevo guardado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando operacion - Perfil Agregar",
    });
  }
};

module.exports = perfilController;
