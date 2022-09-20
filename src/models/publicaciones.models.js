const { model, Schema, Schema} = require("mongoose");
const {} = require("./materias.models");
const {} = require("./user.models");


const PublicacionesSchema = new Schema(
    {
      usuario: { type: Schema.Types.ObjectId, ref: "User"},
      texto: { type : String, required: true},
      date:  Date.now(),
      archivos : { type: String },
      comments: [
        {
            user: { type: Schema.Types.ObjectId, ref:"User"},
            text: { type: String, required: true },
            date: Date.now()
        }
      ],
      tipo: { type: String, enum: ["general", "particular"]},
      materia: { type: Schema.Types.ObjectId, ref: "Materia" }
    }
)

module.exports = model("Publicaciones", PublicacionesSchema);