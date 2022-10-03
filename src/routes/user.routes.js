const router = require("express").Router();
const { rutaGet, rutaPost, rutaPut, rutaLogicalDelete, login } = require("../controllers/user.controllers")
const validarCampos = require('../helpers/validarCampos');
const { validarJWT, validarUser } = require('../middlewares/index')


//Routes
router.get('/', rutaGet);
router.post('/',
[
    validarJWT,
    validarUser,
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