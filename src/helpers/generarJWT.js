const jwt = require('jsonwebtoken');

const generarJWT = (payload) => {
    
    return new Promise( (resolve, reject) => {
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h',
        }, (err, token) => {
            if(err) {
                reject('No se pudo generar el token: ' + err);
            }

            resolve(token);
        });
    });
}

module.exports = generarJWT;