const router = require('express').Router();
const { getMateria, postMateria, putMateria } = require('../controllers/materia.controllers');
const validarCampos = require('../helpers/validarCampos');
const { validarJWT, validarMateria } = require('../middlewares/index')

router.get('/', getMateria);
router.post('/',
[
validarJWT,
validarMateria,
validarCampos
], postMateria);

router.put('/:id',
[
validarJWT,
validarMateria,
validarCampos
],putMateria)

module.exports = router;