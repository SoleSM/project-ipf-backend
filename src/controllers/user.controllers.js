const ctrlUser = {};
const User = require('../models/user.models');
const generarJWT = require("../helpers/generarJWT");
const bcrypt = require('bcrypt');

// POST -> Ctrl para Login de usuario
ctrlUser.login = async (req, res) => {

    const { email, password } = req.body;

    // Verificar si el email existe
    const usuario = await User.findOne({ email });

    console.log(usuario);

    if (!usuario) {
        return res.status(400).json({
            body: false,
            msg: "Usuario / Password no son correctos - correo",
        });
    }

    // SI el usuario está activo
    if (!usuario.active) {
        return res.status(400).json({
            body: false,
            msg: "Usuario / Password no son correctos - estado: false",
        });
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
        return res.status(400).json({
            body: false,
            msg: "Usuario / Password no son correctos - password",
        });
    }



    // Generación del token de autenticación
    const token = await generarJWT({ uid: usuario._id });

    return res.json({
        ok: true,
        msg: "Usuario logueado exitosamente",
        usuario,
        token: token
    });

}



//mostrar todos los usuarios
ctrlUser.rutaGet = async (req, res) => {

    const usuario = await User.find();
    res.json({ ok: true, usuario });

};

//Mostrar alumno por DNI
ctrlUser.rutaGetDNI = async (req, res) => {

    const { numeroDni } = req.params
    try {
        const usuario = await User.findOne(numeroDni)
        res.json({
            ok: true,
            msg: "Usuario encontrado",
            usuario
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: "Usuario no encontrado"
        })
    }


}

//agrega el usuario

ctrlUser.rutaPost = async (req, res) => {

    const { nombre, apellido, numeroDni, sexo, fechaDeNacimiento,
        email, password, tipo } = req.body;

    console.log("body desde el back => ", req.body)
    const passwordHashed = bcrypt.hashSync(password, 10);

    try {

        const usuario = new User({
            nombre, apellido, numeroDni, sexo, fechaDeNacimiento,
            email, password: passwordHashed, tipo
        });

        //Guardar usuario en db
        await usuario.save();

        res.json({
            ok: true,
            msg: 'Usuario agregado exitosamente',
            usuario
        });

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            error: error
        });
    };
};



//edita el usuario

ctrlUser.rutaPut = async (req, res) => {


    const { id } = req.params;
    const { ...resto } = req.body;

    try {

        const userUpdated = await User.findByIdAndUpdate(id, resto, { new: true })

        return res.json({
            ok: true,
            msg: 'Datos actualizados correctamente!',
            user: userUpdated
        })

    } catch (error) {
        console.log('Error al actualizar los datos del usuario: ', error);
    }

};

// eliminacion logica
ctrlUser.rutaLogicalDelete = async (req, res) => {

    let { id } = req.params;

    const userDeleted = await User.findByIdAndUpdate(id, {
        active: false
    })

    return res.json({
        ok: true,
        msg: 'Usuario eliminado correctamente!',
        user: userDeleted
    })
}

module.exports = ctrlUser;

