const mongoose = require("mongoose");
const { Schema } = mongoose;

const CursoSchema = new Schema({
  curso_titulo: { type: String, required: true },
  curso_precio: { type: String, required: true },
  curso_destino: { type: String, required: true },
  curso_duracion: { type: String, required: true },
  curso_objetivo: { type: String, required: true },
  curso_modalidad: { type: String, required: true },
  curso_descripcion: { type: String, required: true },
  //usuario de tipo profesional
  //usuario de tipo cliente
});

module.exports = mongoose.model("Curso", CursoSchema);
