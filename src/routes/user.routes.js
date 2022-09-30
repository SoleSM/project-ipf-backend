const router = require("express").Router();
const { rutaGet, rutaPost, rutaPut, rutaLogicalDelete, login} = require("../controllers/user.controllers")
//Controllers

router.get('/get-user', rutaGet);
router.post('/add-user', rutaPost);
router.post('/login', login)
router.put('/:id', rutaPut);
router.delete('/:id', rutaLogicalDelete);



module.exports = router;