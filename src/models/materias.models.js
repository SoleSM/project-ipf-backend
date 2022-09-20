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
        inasistencias: [
            {
                fecha: { type: Date },
                alumnos: [{ type: Schema.Types.ObjectId, ref: "User" }]
            }
        ],
        notas: [
            {
                alumno: { type: Schema.Types.ObjectId, ref: "User" },
                tipo: { type: String, enum: ["Primer parcial", "Segundo Parcial", "Recuperatorio", "Final"] },
                calificacion: { type: Number, required: true }
            }
        ]


    }
)

module.exports = model("Materia", MateriaSchema);