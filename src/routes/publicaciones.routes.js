const router = require('express').Router();

const {
    getPublicaciones,
    postPublicaciones,
    putPublicaciones,
    deletePublicaciones,
    getPublicacionesMateria
} = require('../controllers/publicaciones.controllers');
const { validarJWT, validarPublicaciones} = require('../middlewares/index')
const validarCampos = require('../helpers/validarCampos');

//Rutas
router.get('/', getPublicaciones);
router.get('/publicaciones-materia/:idMateria', getPublicacionesMateria)

router.post('/',
[
  validarJWT,
  validarPublicaciones,
  validarCampos
],postPublicaciones);

router.put('/:id',
[
  validarJWT,
  validarPublicaciones,
  validarCampos
],putPublicaciones);

router.delete('/:id',
[
  validarJWT,
  validarPublicaciones,
  validarCampos
],deletePublicaciones);


module.exports = router;