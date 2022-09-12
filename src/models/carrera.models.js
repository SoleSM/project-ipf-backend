const { model, Schema } = require("mongoose");
const {} = require("./materias.models");

const CarreraSchema = new Schema(
    {
        nombre: { type: String, required: true },
        duracion: { type: Number, required: true },
        materias: [
            { type: Schema.Types.ObjectId, ref:"Materia" }
        ],
        active: { type: Boolean, default: true}


    }
)

module.exports = model("Carrera", CarreraSchema);