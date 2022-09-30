const jwt = require("jsonwebtoken");
const { SECRET } = require(process.env.SECRET);

const generarJWT = (payload) => {
    return new Promise( (resolve, reject) => {
        jwt.sign(payload, SECRET, {
            expiresIn: '1h',
        },
        (err, token) =>{
            if(err){
                reject("No se puedo generar el token:  ", err)
            }

            resolve(token)
        });
    });
}

module.exports = generarJWT;