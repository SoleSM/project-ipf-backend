const { check } = require('express-validator');
const mensajeValidacion = {msg:"Todos los campos son requeridos"};

const validarCarrera = [

check('nombre')
.notEmpty().withMessage(mensajeValidacion)
.isString(),

check('materias')
.notEmpty().withMessage(mensajeValidacion)
.isArray(),

check('cursos')
.notEmpty().withMessage(mensajeValidacion)
.isArray()
]

module.exports = validarCarrera;