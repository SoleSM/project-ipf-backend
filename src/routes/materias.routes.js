const router = require('express').Router();

const { } = require('../controllers/materia.controllers');

router.get('/get-materias', getMateria);
router.post('/add-materia', postMateria);
router.put('/update:id', putMateria)
router.delete('/delete-materia', deleteMateria);

module.exports = router;