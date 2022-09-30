const router = require("express").Router();
const { rutaGet, rutaPost, rutaPut, rutaLogicalDelete} = require("../controllers/user.controllers")
//Controllers

router.get('/get-user', rutaGet);
router.post('/add-user', rutaPost);
router.put('/:id', rutaPut);
router.delete('/:id', rutaLogicalDelete);



module.exports = router;