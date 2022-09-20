const { model, Schema, Schema} = require("mongoose");
const materiasModels = require("./materias.models");
const {} = require("./user.models");


const PublicacionesSchema = new Schema(
    {
      usuario: { type: Schema.Types.ObjectId, ref: "User"},
      texto: { type : String, required: true},
      date: { type: Date },
      comments: [
        {
            user: { type: Schema.Types.ObjectId, ref:"User"},
            text: { type: String, required: true },
            date: { type: Date }
        }
      ],
      tipo: { type: String, enum: ["general", "materia"]},
      materia: { type: Schema.Types.ObjectId, ref: "Materia" }
    }
)

module.exports = model("Publicaciones", PublicacionesSchema);