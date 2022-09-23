const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
    {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        numeroDni: { type: String, required: true },
        sexo: { type: String, enum: ["Femenino", "Masculino", "Indefinido", "Otros"] },
        fechaDeNacimiento: { type: Date, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        active: { type: Boolean, default: true },
        tipo: { type: String, enum: ["alumno", "profesor", "administrador"] },
        dataAlumno: {
            direccion: {
               barrio: {type: String },
               calle: { type: String }
            },
            secundaroCompleto: { type: Boolean, required: true }
        },
        dataProfesor: {
            titulo: { type: String }
        }

    }
)

module.exports = model("User", UserSchema);