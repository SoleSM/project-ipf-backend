const { model, Schema } = require("mongoose");
const {} = require("./user.models");
const {} = require("./carrera.models");
const {} = require("./notas.models");


const AlumnoSchema = new Schema(
    {
        user:  { type: Schema.Types.ObjectId, ref: 'User' },
        tituloSecundario : { type: String, required: true },
        carrera: { type: Schema.Types.ObjectId, ref: 'Carrera' },

        // ???? duda
        notas: { type: Schema.Types.ObjectId, ref:"Notas" },


    }
)

module.exports = model("Alumno", AlumnoSchema);