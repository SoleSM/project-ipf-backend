const { model, Schema } = require("mongoose");
const {} = require("./user.models");


const ProfileSchema = new Schema(
    {
        user:  { type: Schema.Types.ObjectId, ref: 'User' },
        tipo: ["alumno", "profesor", "administrador"],
        dataAlumno: {
            certificadoDomicilio: { type: String, required: true},
            tituloSecundario : { type: String, required: true },
        },
        dataProfesor: {
            
        }

    }
)

module.exports = model("Profile", ProfileSchema);