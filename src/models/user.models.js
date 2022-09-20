const {model, Schema} = require("mongoose");

const UserSchema = new Schema( 
    {
        nombre: { type : String, required: true },
        apellido: { type : String, required: true },
        numeroDni: { type : String, required: true },
        sexo: { type : String, enum:["Femenino", "Masculino", "Indefinido","Otros"]},
        fechaDeNacimiento: { type : Date, required: true },
        email: { type : String, required: true },
        password: { type: String, required: true },
        active: { type: Boolean, default: true },
        tipo: {type: String, enum:["alumno", "profesor", "administrador"]},
        dataAlumno: {
            certificadoDomicilio: { type: String, required: true},
            tituloSecundario : { type: String, required: true },
        },
        dataProfesor: {
            
        },
        dataAdmin: {

        }
        
    }
)

module.exports = model("User", UserSchema);