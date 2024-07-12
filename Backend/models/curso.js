const mongoose = require("mongoose");
const { Schema } = mongoose;

const CursoSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    linkvideo: { type: String, required: true },
    linkvideoresumen: { type: String, required: false},
    precio: { type: Number, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    miembros: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
});

module.exports = mongoose.models.Curso || mongoose.model('Curso', CursoSchema);
