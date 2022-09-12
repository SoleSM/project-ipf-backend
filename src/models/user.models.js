const {model, Schema} = require("mongoose");

const UserSchema = new Schema( 
    {
        nombre: { type : String, required: true },
        apellido: { type : String, required: true },
        numeroDni: { type : String, required: true },
        sexo: { type : String, required: true },
        fechaDeNacimiento: { type : Date, required: true },
        email: { type : String, required: true },
        password: { type: String, required: true },
        active: { type: Boolean, default: true }
        
    }
)

module.exports = model("User", UserSchema);