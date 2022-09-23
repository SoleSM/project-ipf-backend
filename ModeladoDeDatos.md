**Modelado de datos**

*User model*
~
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
~

*Materias model*
~
   {
        nombre: { type: String, required: true },
        profesores: [
            { type: Schema.Types.ObjectId, ref: "User" }
        ],
        alumnos: [
            { type: Schema.Types.ObjectId, ref: "User" }
        ],
        inasistencias: [
            {
                fecha: { type: Date },
                alumnos: [{ type: Schema.Types.ObjectId, ref: "User" }]
            }
        ],
        notas: [
            {
                alumno: { type: Schema.Types.ObjectId, ref: "User" },
                tipo: { type: String, enum: ["Primer parcial", "Segundo Parcial", "Recuperatorio", "Final"] },
                calificacion: { type: Number, required: true }
            }
        ]


    }
~

*Carrera Model*
~
    {
        nombre: { type: String, required: true },
        duracion: { type: Number, required: true },
        materias: [
            { type: Schema.Types.ObjectId, ref:"Materia" }
        ],
        cursos: [
            {
                anio: { type: String, required: true },
                ciclo_lectivo: { type: String, require: true }
            }
        ],
        active: { type: Boolean, default: true}


    }
~

*Publicaciones Model*
<pre>
    <code>

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

    </code>
</pre>
