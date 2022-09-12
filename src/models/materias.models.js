const { model, Schema } = require("mongoose");

const MateriaSchema = new Schema(
    {
        nombre: { type: String, required: true },
        carrera: { type: Schema.Types.ObjectId, ref:"Carrera" },
        
    }
)

module.exports = model("Materia", MateriaSchema);