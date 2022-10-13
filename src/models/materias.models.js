const { model, Schema } = require("mongoose");

const MateriaSchema = new Schema(
    {
        nombreMateria: { type: String, required: true },
        profesores: [
            { type: Schema.Types.ObjectId, ref: "User" }
        ],
        alumnos: [
            { type: Schema.Types.ObjectId, ref: "User" }
        ],
        inasistencias: [
            {
                fecha:  { type : Date, default: Date.now() },
                alumnos: [{ type: Schema.Types.ObjectId, ref: "User" }]
            }
        ],
        notas: [
            {
                periodo: {enum: ["Primer cuatrimestre", "Segundo cuatrimestre"]},
                alumno: { type: Schema.Types.ObjectId, ref: "User" },
                tipo: { type: String, enum: ["Primer parcial", "Segundo Parcial", "Recuperatorio", "Final"] },
                calificacion: { type: Number }
            }
        ]


    }
)

module.exports = model("Materia", MateriaSchema);