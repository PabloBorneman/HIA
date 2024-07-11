const mongoose = require("mongoose");
const { Schema } = mongoose;
const PerfilSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
});
module.exports = mongoose.models.Perfil || mongoose.model("Perfil", PerfilSchema);