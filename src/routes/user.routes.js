const router = require("express").Router();
const { rutaGet, rutaPut, rutaLogicalDelete, rutaGetDNI } = require("../controllers/user.controllers")
const validarCampos = require('../helpers/validarCampos');
const { validarJWT, validarUser, existeEmail, existeDNI } = require('../middlewares/index')
const { check } = require('express-validator')

//Routes
router.get('/', rutaGet);
router.get('/:dni', rutaGetDNI)

router.put('/:id',
    [
        validarJWT,
        validarUser,
        validarCampos
    ], rutaPut);

router.delete('/:id',
    [
        validarJWT
    ], rutaLogicalDelete);

module.exports = router;