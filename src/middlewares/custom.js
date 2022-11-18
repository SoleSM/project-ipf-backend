const User = require('../models/user.models');

//Valida existencia de Email
 const existeEmail = async(email = "") => {

    const emailEncontrado = await User.findOne({email});

    if(emailEncontrado){
        throw new Error("Ya hay una persona registrada con este email")
    }

}

//Valida existencia de DNI
 const existeDNI = async(numeroDni = "") => {

    const dniEncontrado = await User.findOne({numeroDni});

    if(dniEncontrado){
        throw new Error("Ya hay una persona registrada con este DNI")
    }

}

module.exports = {
    existeEmail,
    existeDNI
}