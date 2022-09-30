const router = require('express').Router();

const {
    getPublicaciones,
    postPublicaciones,
    putPublicaciones,
    deletePublicaciones
} = require('../controllers/publicaciones.controllers');


router.get('/', getPublicaciones);
router.post('/', postPublicaciones);
router.put('/:id', putPublicaciones);
router.delete('/:id', deletePublicaciones);


module.exports = router;