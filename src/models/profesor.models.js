const { model, Schema, Schema} = require("mongoose");
const {} = require("./user.models");
const {} = require("./materias.models");

const ProfesorSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref:"User" },
        materiasEncargadas: [ 
            { type: Schema.Types.ObjectId, ref:"Materia" }
        ]
    }
)

module.exports = model("Profesor", ProfesorSchema);