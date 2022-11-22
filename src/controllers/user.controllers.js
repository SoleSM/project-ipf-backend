const ctrlUser = {};
const User = require('../models/user.models');



//mostrar todos los usuarios
ctrlUser.rutaGet = async (req, res) => {

    const usuario = await User.find();
    res.json({ ok: true, usuario });

};

//Mostrar alumno por DNI
ctrlUser.rutaGetDNI = async (req, res) => {

    const { dni } = req.params
    console.log(dni)

    try {
        const usuario = await User.findOne({numeroDni: dni})
        console.log(usuario)
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

