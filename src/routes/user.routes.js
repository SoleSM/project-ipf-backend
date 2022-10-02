const router = require("express").Router();
const { rutaGet, rutaPost, rutaPut, rutaLogicalDelete, login} = require("../controllers/user.controllers")
const { check } = require('express-validator');

const mensajeValidacion = "Todos los campos son obligatorios";

//Routes
router.get('/', rutaGet);
router.post('/', 
[
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

check('secundarioCompleto')
.notEmpty().withMessage(mensajeValidacion)
.isBoolean()
],
rutaPost);
router.post('/login', login)
router.put('/:id', rutaPut);
router.delete('/:id', rutaLogicalDelete);



module.exports = router;