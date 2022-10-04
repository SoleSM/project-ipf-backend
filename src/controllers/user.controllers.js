const ctrlUser = {};
const User = require('../models/user.models');
const generarJWT = require("../helpers/generarJWT");
const bcrypt = require('bcrypt');

// POST -> Ctrl para Login de usuario
ctrlUser.login = async(req, res) => {

    const { email, password } = req.body;

    //Si no se envian el email o el password 
    if (!email || !password) {
        return res.status(400).json({
            msg: 'Error de autenticación'
        })
    };

    // Busqueda del usuario segun las credenciales recibidas
    const user = await User.findOne({ email, password });

    //Si el usuario está inactivo
    if (!user.active) {
        return res.status(400).json({
            msg: 'Error al autenticarse, verifique las credenciales'
        })
    };

    // Generación del token de autenticación
    const token = await generarJWT({ uid: user._id });

    return res.json({
        msg: "Usuario logueado exitosamente",
        user,
        token: token
    });

}



//mostrar todos los usuarios
ctrlUser.rutaGet = async(req, res) => {

    const usuario = await User.find();
    res.json(usuario);

};

//Mostrar alumno por DNI
ctrlUser.rutaGetDNI = async(req, res) => {

    const { numeroDni } = req.params
    try {
        const usuario = await User.findOne(numeroDni)
        res.json({
            msg: "Usuario encontrado",
            usuario
        })
    } catch (error) {
        res.json({
            msg:"Usuario no encontrado"
        })
    }
  

}

//agrega el usuario

ctrlUser.rutaPost = async(req, res) => {

    const { nombre, apellido, numeroDni, sexo, fechaDeNacimiento,
        email, password, tipo, dataAlumno, dataProfesor, dataAdmin } = req.body;

    const passwordHashed = bcrypt.hashSync(password,10);

    try {
        const usuario = new User({
            nombre, apellido, numeroDni, sexo, fechaDeNacimiento,
            email, password: passwordHashed, tipo, dataAlumno, dataProfesor, dataAdmin
        });

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

ctrlUser.rutaPut = async(req, res) => {


    const { id } = req.params;
    const { ...resto } = req.body;

    try {

        const userUpdated = await User.findByIdAndUpdate(id, resto, { new: true })

        return res.json({
            msg: 'Datos actualizados correctamente!',
            user: userUpdated
        })

    } catch (error) {
        console.log('Error al actualizar los datos del usuario: ', error);
    }

};

// eliminacion logica
ctrlUser.rutaLogicalDelete = async(req, res) => {

    let { id } = req.params;

    const userDeleted = await User.findByIdAndUpdate(id, {
        active: false
    })

    return res.json({
        msg: 'Usuario eliminado correctamente!',
        user: userDeleted
    })
}

module.exports = ctrlUser;

