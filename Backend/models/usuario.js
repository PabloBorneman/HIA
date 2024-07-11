const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    nombres: { type: String, required: true },
    apellido: { type: String, required: true },
    perfil: { type: Schema.Types.ObjectId, ref: 'Perfil', required: true },
    cursos: [{ type: Schema.Types.ObjectId, ref: 'Curso'}],
    cursosImpartidos: [{ type: Schema.Types.ObjectId, ref: 'Curso', default: [] }]
});

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);
