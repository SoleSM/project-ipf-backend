const router = require('express').Router();

const {
    getPublicaciones,
    postPublicaciones,
    putPublicaciones,
    deletePublicaciones
} = require('../controllers/publicaciones.controllers');
const { validarJWT, validarPublicaciones} = require('../middlewares/index')
const validarCampos = require('../helpers/validarCampos');

//Rutas
router.get('/', getPublicaciones);

router.post('/',
[

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