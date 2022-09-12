const { model, Schema, Schema} = require("mongoose");

const ProfesorSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref:"User" },
        materiasEncargadas: [ 
            { type: Schema.Types.ObjectId, ref:"Materia" }
        ]
    }
)

module.exports = model("Profesor", ProfesorSchema);