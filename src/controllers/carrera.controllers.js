const ctrlCarrera = {};
const Carrera = require("../models/carrera.models");

ctrlCarrera.getCarrera = async (req, res) => {
        const carrera = await Carrera.find();
        res.json(carrera)
}

ctrlCarrera.getAlumnosxCurso = async (req, res) => {
    const { idCarrera, idCurso } = req.params;   
   
    try {
        const CarreraEncontrada = await Carrera.findOne({idCarrera});
        const { cursos } = CarreraEncontrada;
        const CursoEncontrado = cursos.filter(curso => curso._id == idCurso);
        const [ {alumnos} ] = CursoEncontrado;
        res.json({
            "Alumnos de este curso" : alumnos
        })
    } catch (error) {
        console.log(error)
    }
}

ctrlCarrera.postCarrera = async (req, res) => {
    const { nombre, duracion, materias, cursos } = req.body;

    try {
        const carreraAdded = new Carrera({nombre, duracion, materias, cursos});
        carreraAdded.save();
        res.json({
            msg:"Carrera agregada",
            carreraAdded
        })
    } catch (error) {
        res.json({
            msg:"Error al agregar la carrera", error
        })
    }
}

ctrlCarrera.putCarrera = async (req, res) => {
    const { id } = req.params;
    const {...resto} = req.body;

    try {
        const carreraUpdated = await Carrera.findByIdAndUpdate(id, resto, { new:true });
        res.json({
            msg:"Carrera modificada", 
            carreraUpdated
        })
    } catch (error) {
        res.json({
            msg:"Error al modificar la carrera", error
        })
    }
}

ctrlCarrera.deleteCarrera = async (req, res) => {
    const { id } = req.params;

    try {
        const carreraDeleted = await Carrera.findByIdAndUpdate(id, { active: false });
        res.json({
            msg:"Carrera eliminada", 
            carreraDeleted
        })
    } catch (error) {
        res.json({
            msg:"Error al intentar eliminar la carrera", error
        })
    }
}

module.exports = ctrlCarrera;