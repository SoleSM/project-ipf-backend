const router = require("express").Router();
const { rutaGet, rutaPost, rutaPut, rutaLogicalDelete, login, rutaGetDNI } = require("../controllers/user.controllers")
const validarCampos = require('../helpers/validarCampos');
const { validarJWT, validarUser, existeEmail, existeDNI } = require('../middlewares/index')


//Routes
router.get('/');
router.get('/:dni', rutaGetDNI)
router.post('/',
[
    validarJWT,
    validarUser,
    existeEmail,
    existeDNI,
    validarCampos
],rutaPost);

router.post('/login', login)

router.put('/:id',
[   validarJWT,
    validarUser,
    validarCampos
],rutaPut);

router.delete('/:id',
[
validarJWT
],rutaLogicalDelete);



module.exports = router;