const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
    {
        nombre: { type: String },
        apellido: { type: String, required: true },
        numeroDni: { type: String},
        sexo: { type: String, enum: ["Femenino", "Masculino", "Otro"] },
        fechaDeNacimiento: { type: Date, required: true},
        email: { type: String, required: true },
        password: { type: String, required: true },
        active: { type: Boolean, default: true },
        tipo: { type: String, required: true},
    }
)

UserSchema.methods.toJSON = function ()  {
    const {__v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;

    return usuario;
}

module.exports = model("User", UserSchema);