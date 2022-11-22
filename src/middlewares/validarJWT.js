const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const validarJWT = async (req, res, next) => {

    console.log("validarJWT")
    //se envia el token en la cabecera
    const token = req.header('token');
    //si no se encuentra el token en la cabecera
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token"
        })
    }

    try {

        //Verifica que el token sea válido
        //Se vuelve a firmar el token y si coincide con el recibido, es válido
        const { uid } = jwt.verify(token, process.env.SECRET);

        //Busca el usuario por id 
        const usuario = await User.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "Token inválido, no existe el usuario"
            });
        };

        //Si pasa esas validaciones, se guardan los datos del usuario en la req
        req.usuario = usuario;
        next();

    } catch (error) {

        return res.json({
            ok: false,
            msg: "Token no válido"
        });
    };


}

module.exports = validarJWT;
