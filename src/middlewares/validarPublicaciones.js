const { check } = require('express-validator');
const mensajeValidacion = {msg:"Todos los campos son requeridos"};

const validarPublicaciones = [

check('usuario')
.notEmpty().withMessage(mensajeValidacion),

check('texto')
.notEmpty().withMessage(mensajeValidacion)
.isString().isLength({max: 500}),

check('archivos')
.isURL(),

check('comments')
.isArray(),

check('tipo')
.notEmpty().withMessage(mensajeValidacion)
.isIn(["general", "particular"]).withMessage({msg:"El tipo de publicacion no es valido"}),

]

module.exports = validarPublicaciones;