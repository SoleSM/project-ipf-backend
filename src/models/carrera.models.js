const { model, Schema } = require("mongoose");
const {} = require("./materias.models");
const {} = require('./user.models')

const CarreraSchema = new Schema(
    {
        nombre: { type: String, required: true },
        duracion: { type: Number, required: true },
        materias: [
            { type: Schema.Types.ObjectId, ref:"Materia" }
        ],
        cursos: [
            {
                anio: { type: String },
                ciclo_lectivo: { type: String },
                alumnos: [
                    { type: Schema.Types.ObjectId, ref:"User"}
                ]
            }
        ],
        active: { type: Boolean, default: true}


    }
)

module.exports = model("Carrera", CarreraSchema);