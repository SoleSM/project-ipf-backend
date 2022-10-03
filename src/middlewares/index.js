const validarJWT = require('./validarJWT');
const validarMateria = require('./validarMateria');
const validarUser = require('./validarUser');
const validarPublicaciones= require('./validarPublicaciones');
const validarCarrera = require('./validarCarrera');


module.exports = {
    validarJWT,
    validarMateria, 
    validarUser,
    validarPublicaciones,
    validarCarrera

}