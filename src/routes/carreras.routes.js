const router = require("express").Router();
const {
    getCarrera,
    postCarrera,
    putCarrera,
    deleteCarrera
    } = require("../controllers/carrera.controllers");
const validarCampos = require('../helpers/validarCampos');
const { validarCarrera, validarJWT} = require('../middlewares/index');


//Rutas
router.get("/", getCarrera);

router.post("/",
[
validarJWT,
validarCarrera,
validarCampos
],postCarrera);

router.put("/:id",
[
validarJWT,
validarCarrera,
validarCampos
],putCarrera);

router.delete("/:id",
[
validarJWT,
validarCarrera,
validarCampos
],deleteCarrera);

module.exports = router;