const router = require('express').Router();
const { getMateria,
    postMateria,
    putMateria,
    getNotaAlumno,
    putNotaDeAlumno,
    getInasistenciasDia,
    putInasistencia,
    getCountInasistencias
} = require('../controllers/materia.controllers');
const validarCampos = require('../helpers/validarCampos');
const { validarJWT, validarMateria } = require('../middlewares/index')

router.get('/', getMateria);

router.get('/alumnoNota/:id', getNotaAlumno);

router.get('/inasistencias/:id', getInasistenciasDia);

router.get('/cant-inasistencias/:id/:idAlumno', getCountInasistencias);


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
    ], putMateria)

router.put('/modificarNota/:id/:idNota', putNotaDeAlumno)

router.put('/modificar-inasistencia/:id', putInasistencia)
module.exports = router;