const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  perfil: { type: String, required: true },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
