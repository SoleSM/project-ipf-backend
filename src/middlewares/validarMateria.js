const { check } = require('express-validator');
const mensajeValidacion = "Todos los campos son requeridos";

const validarMateria = [

check('nombreMateria')
.notEmpty().withMessage(mensajeValidacion)
.isString(),

check('profesores')
.notEmpty().withMessage(mensajeValidacion)
.isArray(),

check('alumnos')
.notEmpty().withMessage(mensajeValidacion)
.isArray(),

check('inasistencias')
.notEmpty().withMessage(mensajeValidacion)
.isArray(),

check('notas')
.notEmpty().withMessage(mensajeValidacion)
.isArray(),

]

module.exports = validarMateria;