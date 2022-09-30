const router = require('express').Router();

const { getMateria, postMateria, putMateria } = require('../controllers/materia.controllers');

router.get('/', getMateria);
router.post('/', postMateria);
router.put('/:id', putMateria)

module.exports = router;