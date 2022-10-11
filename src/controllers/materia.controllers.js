const ctrlMateria = {};
const Materia = require('../models/materias.models');


//Mostrar todas las materias
ctrlMateria.getMateria = async(req, res) => {

    const materia = await Materia.find();

    res.json(materia)

};

ctrlMateria.getNotaAlumno = async(req, res) => {
    const { alumno, nombre} = req.body;

    console.log(nombre)
    try {

        const MateriaEncontrada = await Materia.findOne({
            nombre
        })

        console.log(MateriaEncontrada.notas)
        const alumnoEncontrado = await MateriaEncontrada.notas.find({alumno})

        res.json({
            msg: "Alumno encontrado",
            MateriaEncontrada,
            "alumno": alumnoEncontrado
        })
        
    } catch (error) {
        res.json({
            msg: "Error Alumno NO encontrado",
            error
        })
    }

  


};

ctrlMateria.postMateria = async(req, res) => {

    const { nombre, profesores, alumnos, inasistencias, notas} = req.body;

    try {
        const materiaAdded = new Materia({nombre, profesores, alumnos, inasistencias, notas})
        await materiaAdded.save();

        res.json({
            msg: "Materia agregada",
            materiaAdded
        })

    } catch (error) {
        res.json({
            msg:"Error al agregar una materia",error
        })
        console.log("Error al agregar una materia",error)
    }


}

ctrlMateria.putMateria = async(req, res) => {

    const { id } = req.params;
    const {...resto } = req.body;

    try {
    
        const materiaUpdated = await Materia.findByIdAndUpdate( id, resto, {new:true})

        res.json({
            msg: "Datos de la materia actualizados correctamente",
            materiaUpdated
        })

    } catch (error) {

        res.json({
            msg:"Error al actualizar la materia",error
        })

    }

}






module.exports = ctrlMateria;