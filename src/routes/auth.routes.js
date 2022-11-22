const router = require('express').Router();
const { validarJWT } = require('../middlewares');
const { login, reNew, register } = require('../controllers/auth.controllers')
const { validarUser, existeDNI, existeEmail } = require('../middlewares/index')
const validarCampos = require('../helpers/validarCampos')
const { check } = require('express-validator')

router.get('/renew', validarJWT, reNew)
router.post('/register',
    [
        validarUser,
        check("email").custom(existeEmail),
        check("numeroDni").custom(existeDNI),
        validarCampos
    ], register);

router.post('/login', login)



module.exports = router;