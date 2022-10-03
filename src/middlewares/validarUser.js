const { check } = require('express-validator');

const mensajeValidacion = {msg:"Todos los campos son requeridos"};


const validarUser = [
    check('nombre')
    .notEmpty().withMessage(mensajeValidacion)
    .isString().isLength({ min:3, max:30}),
    
    check('apellido')
    .notEmpty().withMessage(mensajeValidacion)
    .isString().isLength({ min:3, max:30}),
    
    check('numeroDni')
    .notEmpty().withMessage(mensajeValidacion)
    .isNumeric().isLength({ min:6, max:9 }),
    
    check('sexo')
    .notEmpty().withMessage(mensajeValidacion)
    .isString(),
    
    check('fechaDeNacimiento')
    .notEmpty().withMessage(mensajeValidacion)
    .isISO8601().toDate(),
    
    check('email')
    .notEmpty().withMessage(mensajeValidacion)
    .normalizeEmail().isEmail(),
    
    check('password')
    .notEmpty().withMessage(mensajeValidacion)
    .isAlphanumeric().isLength({ min:5, max:15 }),
    
    check('tipo')
    .notEmpty().withMessage(mensajeValidacion)
    .isIn(["alumno", "profesor", "administrador"]).withMessage({msg:"El rol que especifica no corresponde"}),
    
    check('dataAlumno.direccion.barrio')
    .notEmpty().withMessage(mensajeValidacion)
    .isAlphanumeric(),
    
    check('dataAlumno.direccion.calle')
    .notEmpty().withMessage(mensajeValidacion)
    .isAlphanumeric(),
    
    check('dataAlumno.secundarioCompleto')
    .optional().isBoolean(),
    
    check('dataProfesor.titulo')
    .optional().isString()
]

module.exports = validarUser;