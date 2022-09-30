const ctrlUser = {};
const User = require('../models/user.models');

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

