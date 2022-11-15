const ctrlMateria = {};
const Materia = require('../models/materias.models');
const mongoose = require('mongoose');

//Mostrar todas las materias
ctrlMateria.getMateria = async (req, res) => {
    const materia = await Materia.find();
    res.json( {ok: true,materia})
};

//Traer las notas de un alumno enviando por parametros el id de la materia
ctrlMateria.getNotaAlumno = async (req, res) => {
    const { id } = req.params;
    const { alumno } = req.body;

    try {
        const NotasDeAlumno = await Materia.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(id)}},
            {$unwind: "$notas"},
            {$match: {"notas.alumno" : new mongoose.Types.ObjectId(alumno)}},
            {$project: {"notas._id": 0, "profesores": 0, "alumnos": 0, "inasistencias": 0, "__v": 0}}
        ])
        console.log(NotasDeAlumno)
        res.json({
            ok: true,
            msg: "Notas encontradas",
            NotasDeAlumno
        })
    } catch (error) {
        res.status(400).json({
            msg: "Error al encontrar las notas de este alumno",
            error
        })
        console.log(error)
    }
};

//Traer todas las inasistencias de una materia 
ctrlMateria.getInasistenciasDia = async (req, res) => {
    const { id } = req.params;

    try {
      const inasistencias = await Materia.aggregate([
            {$match: {_id : new mongoose.Types.ObjectId(id)}},
            {$unwind: "$inasistencias"},
            {$project: {"inasistencias.fecha": 1, "inasistencias.alumnos": 1}}
        ])
       res.json({ ok: true, inasistencias})
    } catch (error) {
        res.json(error)
    }
    

}

//Total de inasistencias de un alumno en una materia (enviada por parametro)
ctrlMateria.getCountInasistencias = async (req, res) => {
    const { id, idAlumno } = req.params;

    try {
        const totalInasistencias = await Materia.aggregate([
            { $match: {_id : new mongoose.Types.ObjectId(id)}},
            { $unwind: "$inasistencias"},
            { $match: {"inasistencias.alumnos" : new mongoose.Types.ObjectId(idAlumno)} },
            { $count: "Cantidad de inasistencias en esta materia"}
        ])
        res.json({  ok: true, totalInasistencias})
    } catch (error) {
        res.json(error);
        console.log(error)
    }
   
}

//Agregar inasistencia
ctrlMateria.putInasistencia = async (req, res) => {
    const { id } = req.params;
    const { inasistencias } = req.body;
    try {
      const ArregloInaActualizado = await Materia.updateOne(
        {_id: id},
        {$push: {"inasistencias": inasistencias}}
      )

       res.json({ ok: true, ArregloInaActualizado})
    } catch (error) {
        res.json(error)
    }
}

//Modificar nota de alumno
ctrlMateria.putNotaDeAlumno = async (req, res) => {
    const { idNota } = req.params;
    const { calificacion, tipo, periodo } = req.body;

    try {
        const NotaActualizada = await Materia.updateOne({'notas._id': idNota},
        {$set: {
            "notas.$.calificacion": calificacion,
            "notas.$.tipo": tipo,
            "notas.$.periodo": periodo
        }})
        console.log(NotaActualizada)
        res.json({  ok: true, NotaActualizada})
    } catch (error) {
        res.json({
            "error": error
        })
        console.log(error)
    }
}

//Crear una Materia
ctrlMateria.postMateria = async (req, res) => {
    const { nombreMateria, profesores, alumnos, inasistencias, notas } = req.body;

    try {
        const materiaAdded = new Materia({ nombreMateria, profesores, alumnos, inasistencias, notas })
        await materiaAdded.save();
        res.json({
            ok: true,
            msg: "Materia agregada",
            materiaAdded
        })
    } catch (error) {
        res.json({
            msg: "Error al agregar una materia", error
        })
        console.log("Error al agregar una materia", error)
    }
}

//Modificar materia
ctrlMateria.putMateria = async (req, res) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    try {
        const materiaUpdated = await Materia.findByIdAndUpdate(id, resto, { new: true })
        res.json({
            ok: true,
            msg: "Datos de la materia actualizados correctamente",
            materiaUpdated
        })
    } catch (error) {
        res.json({
            msg: "Error al actualizar la materia", error
        })
    }
}



module.exports = ctrlMateria;