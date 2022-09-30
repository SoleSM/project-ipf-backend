const router = require("express").Router();
const {
    getCarrera,
    postCarrera,
    putCarrera,
    deleteCarrera
    } = require("../controllers/carrera.controllers");

router.get("/", getCarrera);
router.post("/", postCarrera);
router.put("/:id", putCarrera);
router.delete("/:id", deleteCarrera);

module.exports = router;