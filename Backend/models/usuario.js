const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  telefono: { type: String, required: true },
  perfil: { type: String, required: true },
  //curso - TODO: ver si lo ponemos como string o como schema
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
