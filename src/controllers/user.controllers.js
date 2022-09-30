const ctrlUser = {};
const User = require('../models/user.models');
const generarJWT = require("../helpers/generarJWT");

// POST -> Ctrl para Login de usuario
ctrlUser.login = async (req, res) => {

    const { email, password } = req.body;
 
    if (!email || !password) {
       return res.status(400).json({
          msg: 'Error de autenticación'
       })
    };
 
 
    // Busqueda del usuario segun las credenciales recibidas
    const user = await User.findOne({ email, password });
 
    if (!user.active) {
       return res.status(400).json({
          msg: 'Error al autenticarse, verifique las credenciales'
       })
    };
 
    // Generación del token de autenticación
    const token = await generarJWT({uid: user._id});
 
    return res.json({
       user,
       token: token
    });
 
 }

//mostrar todos los usuarios
ctrlUser.rutaGet = async (req,res)=>{

        const usuario = await User.find();
        res.json(usuario);
};


//agrega el usuario

ctrlUser.rutaPost = async (req,res)=>{
     
        const { nombre, apellido, numeroDni, sexo, fechaDeNacimiento,
        email, password, tipo, dataAlumno, dataProfesor, dataAdmin } = req.body;

        try {
            const usuario = new User({nombre, apellido, numeroDni, sexo, fechaDeNacimiento,
                email, password, tipo, dataAlumno, dataProfesor, dataAdmin});

            //Guardar usuario en db
            await usuario.save();

            res.json({
                msg: 'Usuario agregado exitosamente',
                usuario
            });
        } catch (error) {
            console.log('Error al guardar los datos del usuario: ', error);
        };
};



//edita el usuario

ctrlUser.rutaPut = async (req , res)=>{
        

    const { id } = req.params;
    const { ...resto } = req.body;
    
    try {

        const userUpdated = await User.findByIdAndUpdate(id, resto, {new: true})

        return res.json({
            msg:'Datos actualizados correctamente!',
            user: userUpdated
        })
    
    } catch (error) {
        console.log('Error al actualizar los datos del usuario: ', error);
    }
   
};

// eliminacion logica
ctrlUser.rutaLogicalDelete= async (req, res)=>{

        let { id } = req.params;

        const userDeleted = await User.findByIdAndUpdate(id, {
            active: false
         })
     
         return res.json({
             msg:'Usuario eliminado correctamente!',
             user: userDeleted
         })
}

module.exports = ctrlUser;

