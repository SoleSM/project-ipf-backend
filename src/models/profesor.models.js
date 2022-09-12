const { model, Schema, SchemaType } = require("mongoose");

const ProfesorSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref:"User" },
        materiasEncargadas: [ 
            { type: Schema.Types.ObjectId, ref:"Materia" }
        ]
    }
)