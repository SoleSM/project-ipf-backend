const User = require('../models/user.models');


//Valida existencia de Email
 const existeEmail = async(req, res, next) => {

    const { email } = req.body;
    const emailEncontrado = await User.findOne({email});

    if(emailEncontrado){
        res.json({
            msg:"Este email ya está registrado"
        })
    }

    next();

}

//Valida existencia de DNI
 const existeDNI = async(req, res, next) => {

    const {numeroDni} = req.body;
    const dniEncontrado = await User.findOne({numeroDni});

    if(dniEncontrado){
        res.json({
            msg:"Ya hay una persona registrada con este DNI"
        })
    }

    next();
}

module.exports = {
    existeEmail,
    existeDNI
}