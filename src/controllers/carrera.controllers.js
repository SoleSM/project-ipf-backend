const ctrlCarrera = {};
const Carrera = require("../models/carrera.models");
const mongoose = require('mongoose')

ctrlCarrera.getCarrera = async (req, res) => {
        const carrera = await Carrera.find();
        res.json(carrera)
}

ctrlCarrera.getAlumnosxCurso = async (req, res) => {
    const { idCarrera, idCurso } = req.params;   
   
    try {
        const ListaAlumnos = await Carrera.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(idCarrera)}},
            {$unwind: "$cursos"},
            {$match: {"cursos._id": new mongoose.Types.ObjectId(idCurso)}},
            {$project: {"cursos.alumnos": 1}}
        ])
        res.json({
            "Alumnos de este curso" : ListaAlumnos
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