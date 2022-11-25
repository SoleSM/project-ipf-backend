const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const generarJWT  = require("../helpers/generarJWT");
const ctrlAuth = {};
const { response, request } = require('express');

// POST -> Ctrl para Login de usuario
ctrlAuth.login = async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json({
        ok: false,
        msg: "Todos los campos son requeridos",
    });
    }

    // Verificar si el email existe
    const usuario = await User.findOne({ email });

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: "Usuario / Password no son correctos - correo",
        });
    }

    // SI el usuario está activo
    if (!usuario.active) {
        return res.status(400).json({
            ok: false,
            msg: "Usuario / Password no son correctos - estado: false",
        });
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
        return res.status(400).json({
            ok: false,
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

//Ruta para revalidar el token
ctrlAuth.reNew = async (req = request, res = response) => {
    const { _id: uid } = req.usuario;

    try {        
        const usuario = await User.findById(uid);
        const token = await generarJWT({ uid });
        res.json({
            ok: true,
            msg: "Token revalidado",
            usuario,
            token,
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: "Por favor, hable con el administrador",
        });
    }
};

ctrlAuth.register = async (req, res = response) => {

  const {nombre, apellido, numeroDni, email,
    password,sexo,tipo } = req.body;

  try {
    const usuario = new User({nombre, apellido, numeroDni, email,
      password,sexo,tipo});
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en BD
    const usuarioRegistrado = await usuario.save();

    const token = await generarJWT({uid: usuarioRegistrado._id})


    res.json({
      ok:true,
      usuarioRegistrado,
      token,
      msg: "Usuario registrado exitosamente"
    });

  } catch (err) {
    console.log("Error al registrar al usuario: ", err);
    res.status(500).json({
      ok:false,
      msg: "Por favor, hable con el administrador",
    });
  }
};


module.exports = ctrlAuth;