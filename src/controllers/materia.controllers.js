const ctrlMateria = {};
const Materia = require('../models/materias.models');
const mongoose = require('mongoose')

//Mostrar todas las materias
ctrlMateria.getMateria = async (req, res) => {
    const materia = await Materia.find();
    res.json(materia)
};


ctrlMateria.getNotaAlumno = async (req, res) => {
    const { id } = req.params.id;
    const { idAlumno } = req.body;

    try {
        const MateriaEncontrada = await Materia.findOne({ id, notas: { $elemMatch: { alumno: idAlumno } } })
        const { notas } = MateriaEncontrada
        const Notas = notas.filter(element => element.alumno == idAlumno)

        //    const NotaFinal  =  Nota.filter((data, key) => {
        //         const { alumno } = data
        //         if(alumno == idAlumno) {
        //             return Nota[key].calificacion;
        //         }
        //     })

        console.log(Notas)
        res.json({
            msg: "Materia encontrada",
            Notas
        })
    } catch (error) {
        res.json({
            msg: "Error Alumno NO encontrado",
            error
        })
    }
};

ctrlMateria.getInasistenciasDia = async (req, res) => {
    const { id } = req.params;

    try {
      const inasistencias = await Materia.aggregate([
            {$match: {_id : new mongoose.Types.ObjectId(id)}},
            {$unwind: "$inasistencias"},
            {$project: {"inasistencias.fecha": 1, "inasistencias.alumnos": 1}}
        ])

       console.log(inasistencias)
       res.json(inasistencias)
    } catch (error) {
        res.json(error)
    }
    

}

ctrlMateria.getCountInasistencias = async (req, res) => {

    const { id, idAlumno } = req.params;
    try {
        const totalInasistencias = await Materia.aggregate([
            { $match: {_id : new mongoose.Types.ObjectId(id)}},
            { $unwind: "$inasistencias"},
            { $match: {"inasistencias.alumnos" : new mongoose.Types.ObjectId(idAlumno)} },
            { $count: "Cantidad de inasistencias en esta materia"}
    
        ])
        
        res.json(totalInasistencias)
    } catch (error) {
        res.json(error);
        console.log(error)
    }
   
}

ctrlMateria.putNotaDeAlumno = async (req, res) => {

    try {
        const { id, idNota } = req.params;
        const { calificacion, tipo, periodo } = req.body;
        const MateriaEncontrada = await Materia.findOne({ id })
       
        MateriaEncontrada.notas.map(nota => {
            if(nota._id == idNota){
                nota.calificacion = calificacion
                nota.tipo = tipo
                nota.periodo = periodo
            }
        })

        const materiaModificada = await Materia.findByIdAndUpdate(id, MateriaEncontrada)
        console.log(materiaModificada)
        return res.json(materiaModificada)
    } catch (error) {
        res.json({
            "error": error
        })
    }
}

ctrlMateria.postMateria = async (req, res) => {
    const { nombreMateria, profesores, alumnos, inasistencias, notas } = req.body;

    try {
        const materiaAdded = new Materia({ nombreMateria, profesores, alumnos, inasistencias, notas })
        await materiaAdded.save();
        res.json({
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

ctrlMateria.putMateria = async (req, res) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    try {
        const materiaUpdated = await Materia.findByIdAndUpdate(id, resto, { new: true })
        res.json({
            msg: "Datos de la materia actualizados correctamente",
            materiaUpdated
        })
    } catch (error) {
        res.json({
            msg: "Error al actualizar la materia", error
        })
    }
}

ctrlMateria.putInasistencia = async (req, res) => {
    const { id } = req.params;
    const { inasistencias } = req.body;
    try {
      const variable = await Materia.updateOne(
        {_id: id},
        {$push: {"inasistencias": inasistencias}}
      )

       res.json(variable)
    } catch (error) {
        res.json(error)
    }
}

module.exports = ctrlMateria;