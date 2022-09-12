const router = require("express").Router();
const { rutaGet, rutaPost, rutaPut, rutaLogicalDelete } = require("../controllers/user.controllers")
//Controllers

router.get('/get-user', rutaGet);
router.post('/agregar', rutaPost);
router.put('/update:id', rutaPut);
router.delete('/delete:id', rutaLogicalDelete);



module.exports = router;