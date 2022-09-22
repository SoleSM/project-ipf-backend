const ctrlUser = {};
const User = require('../models/user.models');

//mostrar todos los usuarios
ctrlUser.rutaGet = async (req,res)=>{

        const usuario = await User.find();
        res.json(usuario);
};

//mostrar usuarios por DNI
ctrlUser.rutaGetDNI = async (req,res)=>{
    const { numeroDni } = req.params;
    const usuario = await User.find(numeroDni);
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
        const { _id, email, password, ...resto } = req.body;

        try {
        
            const usuario = await User.findByIdAndUpdate(id, resto, { new: true });

            res.json({
                msg: 'Datos del usuario actualizados exitosamente',
                usuario
            });

        } catch (error) {
            console.log('Error al actualizar los datos del usuario: ', error);
        }

};

// eliminacion logica
ctrlUser.rutaLogicalDelete= async (req, res)=>{

        const { id } = req.params;
        try {
            //Verifico que el usuario este activo
            const inactivo = await User.findById(id);

            /* console.log(inactivo) */
            if (!inactivo.estado) {
                return res.json({
                    msg: `El usuario ${id} no existe`
                });
            };

            const usuario = await User.findByIdAndUpdate(id, { estado: false });

            res.json({
                msg: 'Usuario borrado de la base de datos exitosamente',
                usuario
            });
        } catch (error) {
            console.log('Error al borrar los datos del usuario: ', error);
        };
}

module.exports = ctrlUser;

