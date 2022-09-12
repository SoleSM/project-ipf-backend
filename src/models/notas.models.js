const { model, Schema } = require("mongoose");
const {} = require("./materias.models");

const NotasSchema = new Schema(
    {
        materia: { type: Schema.Types.ObjectId, ref:"Materia" },
        primerParcial: { type: Number, required: true },
        segundoParcial: { type: Number, required: true },
        recuperatorio: { type: Number, required: true },
        final: { type: Number, required: true }
    }
)

module.exports = model("Notas", NotasSchema);