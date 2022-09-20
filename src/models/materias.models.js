const { model, Schema } = require("mongoose");

const MateriaSchema = new Schema(
    {
        nombre: { type: String, required: true },
        profesores: [
            { type: Schema.Types.ObjectId, ref: "User" }
        ],
        alumnos: [
            { type: Schema.Types.ObjectId, ref: "User" }
        ],
        asistencias: {
            tipo: ["P", "A"],
            fecha: { type: Date },
            alumno: { type: Schema.Types.ObjectId, ref: "User" }
        },
        notas: [
            {
                alumno: { type: Schema.Types.ObjectId, ref: "User" },
                primerParcial: { type: Number, required: true },
                segundoParcial: { type: Number, required: true },
                recuperatorio: { type: Number, required: true },
                final: { type: Number, required: true }
            }
        ]


    }
)

module.exports = model("Materia", MateriaSchema);